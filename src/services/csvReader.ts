import fs from 'fs';
import path from 'path';

const inputFilePath = path.resolve(__dirname, '../../data/data.csv');

const readCSVFile = (): string => {
  const fileContent = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

  if (fileContent.length === 0) {
    throw new Error('Arquivo CSV está vazio.');
  }

  return fileContent;
};

const parseCSV = (fileContent: string): any[] => {
  const lines = fileContent.split('\n').map(line => line.trim());
  const headers = ['year', 'title', 'studios', 'producers', 'winner'];
  const result: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(';').map(col => col.trim());

    if (columns.length !== headers.length) {
      console.warn(`Linha ${i + 1} tem um número incorreto de colunas, pulando essa linha.`);
      continue;
    }

    const item: any = {};

    for (let j = 0; j < columns.length; j++) {
      const columnValue = columns[j];
      const header = headers[j];

      if (header === 'year') {
        const regex = /[^0-9]/g;
        const content = columnValue.replace(regex, '');
        item[header] = content ? parseInt(content.trim(), 10) : undefined;
      } else if (header === 'producers') {
        const value = columnValue.replace(' and ', ',').split(',').map(p => p.trim()).join(',');
        item[header] = value ? value : undefined;
      } else if (header === 'winner') {
        const regex = /[^a-zA-Z0-9]/g;
        const content = columnValue.replace(regex, '');
        item[header] = content.includes('yes');
      } else {
        item[header] = columnValue;
      }
    }

    result.push(item);
  }

  return result;
};

export { readCSVFile, parseCSV };