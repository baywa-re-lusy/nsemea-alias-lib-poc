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

  // console.log('FILES: ', files);
  files.forEach(file => {
    replaceAliasInFile(file)
  });
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

function replaceAliasInFile(file: string) {
  console.log('replaceAliasInFile > File : ', file)
  const fileContents = fs.readFileSync(file, 'utf8');
  //Add your custom logic for replacing text inside the file.
  const newContents = fileContents.replace(/@nsemea_lib\//g, '../../nsemea_lib/')
    .replace(/@nsemea_lib_sdf\//g, '../nsemea_lib/');

  fs.writeFileSync(file, newContents);
}
