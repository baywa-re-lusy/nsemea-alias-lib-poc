import { join, isAbsolute, resolve } from 'path';
import { Json } from 'mylas';
import * as fs from 'fs';
import { globSync } from "glob";

export async function replaceAlias() {
  console.log('Running replace alias');
  const config = loadConfigFile();

  // Finding files and changing alias paths
  const posixOutput = config.outDir.replace(/\\/g, '/').replace(/\/+$/g, '');
  console.log('posixOutput : ', posixOutput);
  const files = globSync(`${posixOutput}/**/*.js`, { ignore: `!${posixOutput}/**/node_modules/**` });

  console.log('FILES: ', files);

  // for (const file of readAllFiles(posixOutput)) {
  //   console.log(file);
  // }

}

function loadConfigFile() {
  const config = { baseUrl: '', outDir: '' };

  console.log('loadConfigFile > Resolve tsconfig.json path');

  // Get projects tsconfig file.
  const configFilePath = resolve(process.cwd(), 'tsconfig.json');
  console.log('loadConfigFile > Path tsconfig.json :', configFilePath);

  // Get projects base url and output dir from tsconfig file.
  const { compilerOptions: { baseUrl, outDir } = {
    baseUrl: undefined,
    outDir: undefined }
  } = Json.loadS(configFilePath, true);
  console.log('loadConfigFile > TSconfig.json content baseUrl:', baseUrl);
  console.log('loadConfigFile > TSconfig.json content outDir:', outDir);

  if (baseUrl) {
    config.baseUrl = baseUrl;
  }
  if (outDir) {
    config.outDir = isAbsolute(outDir) ? outDir : join(baseUrl, outDir);
    config.outDir = resolve(process.cwd(), config.outDir);
  }

  console.log('loadConfigFile > Config :', config)

  return config;
}

function* readAllFiles(dir: string) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const result:string[] = [];

  for (const file of files) {
    // console.log('readAllFiles file in files:' , file);
    if (file.isDirectory()) {
       yield* readAllFiles(join(dir, file.name));
    } else {
      console.log('EXTENSION :')
      yield join(dir, file.name);
    }
  }
}
