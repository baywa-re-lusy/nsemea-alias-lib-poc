import { join, isAbsolute, resolve } from 'path';
import { Json } from 'mylas';
import { globbySync } from 'globby';

export async function replaceAlias() {
  console.log('Running replace alias');
  const config = loadConfigFile();

  // Finding files and changing alias paths
  const posixOutput = config.outDir.replace(/\\/g, '/').replace(/\/+$/g, '');
  const globPattern = [
    `${posixOutput}/**/*.js`,
    `!${posixOutput}/**/node_modules`
  ];
  console.log('Search pattern:', globPattern);
  const files = globbySync(globPattern, {
    dot: true,
    onlyFiles: true
  });
  console.log('Found files:', files);

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
  }

  console.log('loadConfigFile > Config :', config)

  return config;
}