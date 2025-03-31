import { join, isAbsolute, resolve } from 'path';
import { Json } from 'mylas';

export async function replaceAlias() {
  console.log('Running replace alias');

  const config = {
    baseUrl: '',
    outDir: ''
  };

  console.log('Resolve tsconfig.json path');

  // Get projects tsconfig file.
  const configFilePath = resolve(process.cwd(), 'tsconfig.json');
  console.log('Path tsconfig.json :', configFilePath);

  // Get projects base url and output dir from tsconfig file.
  const { compilerOptions: { baseUrl, outDir } = {
    baseUrl: undefined,
    outDir: undefined }
  } = Json.loadS(configFilePath, true);
  console.log('TSconfig.json content baseUrl:', baseUrl);
  console.log('TSconfig.json content outDir:', outDir);

  if (baseUrl) {
    config.baseUrl = baseUrl;
  }
  if (outDir) {
    console.log('isAbsolute(outDir) :', isAbsolute(outDir));
    config.outDir = isAbsolute(outDir) ? outDir : join(baseUrl, outDir);
  }

  console.log('Config :', config)

}