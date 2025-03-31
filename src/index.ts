import { resolve } from 'path';
import { Json } from 'mylas';

export async function replaceAlias() {
  console.log('Running replace alias');
  console.log('Resolve tsconfig.json path');
  const configFilePath = resolve(process.cwd(), 'tsconfig.json');
  console.log('Path tsconfig.json :', configFilePath);
  const configFileData = Json.loadS(configFilePath, true);
  console.log('TSconfig.json content:', configFileData);
}