import express from 'express';
import bodyParser from 'body-parser';
import producersRoutes from './routes/producers';
import sequelize from './db';
import { loadCSVData } from './services/csvService';

const app = express();

app.use(bodyParser.json());
app.use('/api', producersRoutes);

const init = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true });
        await loadCSVData();
    } catch (error) {
        console.error('Falha ao iniciar banco de dados ou a carga de dados:', error);
        throw error;
    }
};

export { app, init };