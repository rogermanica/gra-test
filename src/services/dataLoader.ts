import Producer from '../models/producer';
import { readCSVFile, parseCSV } from './csvReader';
import { mapAndFormatProducers, calculateProducerIntervals } from './producerProcessor';

const loadAndProcessCSVData = async (): Promise<void> => {
  try {
    const fileContent = readCSVFile();
    const result = parseCSV(fileContent);
    const items = mapAndFormatProducers(result);
    if (items.length > 0) {
      const producersFormat = calculateProducerIntervals(items);
      await Producer.bulkCreate(producersFormat);
    }
  } catch (err) {
    console.error('Ocorreu um erro ao fazer o parse do arquivo CSV:', err);
    throw err;
  }
};

export { loadAndProcessCSVData };