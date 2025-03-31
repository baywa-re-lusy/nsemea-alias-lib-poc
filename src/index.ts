import { resolve } from 'path';

export async function replaceAlias() {
  console.log('Running replace alias');
  console.log('Resolve tsconfig.json path');
  const configFilePath = resolve(process.cwd(), 'tsconfig.json');
  console.log('Path tsconfig.json :', configFilePath);
}