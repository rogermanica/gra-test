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
        throw err;
    }
};

const processCSVResult = async (result: any[]): Promise<void> => {
    try {
        const items = result.flatMap(item => {
            if (!item.producers || !item.year || !item.winner) return [];
    
            const producers = item.producers.split(',').map((p: string) => p.trim()).filter(Boolean);
            return producers.map((producer: any) => ({
                name: producer,
                year: item.year,
                winner: item.winner
            }));
        });
    
        if (items.length > 0) {
            await Producer.bulkCreate(items);
        }
    } catch (err) {
        throw new Error(`Erro ao inserir dados do produtor: ${err}`);
    }
};

export { loadCSVData };