import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import Producer from '../models/producer';

const inputFilePath = path.resolve(__dirname, '../../data/data.csv');

const loadCSVData = async (): Promise<void> => {
    try {
        const fileContent = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

        if (fileContent.length === 0) {
            throw new Error('Arquivo CSV está vazio.');
        }

        const headers = ['year', 'title', 'studios', 'producers', 'winner'];

        parse(fileContent, {
            delimiter: ';',
            columns: headers,
            fromLine: 2,
            cast: (columnValue, context) => {
                if (context.column === 'year') {
                    const regex = /[^0-9]/g;
                    const content = columnValue.replace(regex, '');
                    return content ? parseInt(content.trim(), 10) : undefined;
                }
                if (context.column === 'producers') {
                    const value = columnValue.replace(' and ', ',').split(',').map(p => p.trim()).join(',');
                    return value ? value : undefined;
                }
                if (context.column === 'winner') {
                    const regex = /[^a-zA-Z0-9]/g;
                    const content = columnValue.replace(regex, '');
                    return content.includes('yes');
                }
                return columnValue;
            }
        }, async (error, result) => {
            if (error) {
                throw new Error('Ocorreu um erro no parse do arquivo CSV.');
            }
            if (result) {
                await processCSVResult(result);
            }
        });
    } catch (err) {
        console.error('Ocorreu um erro ao fazer o parse do arquivo CSV:', err);
    }
};

const processCSVResult = async (result: any[]): Promise<void> => {
    for (const item of result) {
        if (item.producers) {
            const producers = item.producers.split(',').map((p: string) => p.trim());
            for (const producer of producers) {
                try {
                    if (producer && item.year && item.winner !== undefined) {
                        await Producer.create({
                            name: producer,
                            year: item.year,
                            winner: item.winner
                        });
                    }
                } catch (err) {
                    console.error(`Erro ao inserir dados do produtor ${producer}:`, err);
                }
            }
        }
    }
};

export { loadCSVData };