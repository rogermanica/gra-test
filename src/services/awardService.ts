import sequelize from '../db';
import { QueryTypes } from 'sequelize';

async function findProducerMinInterval() {
    const query =  `SELECT name AS producer, interval, previousWin, followingWin
            FROM producers
            ORDER BY interval ASC
            LIMIT 2;`
    return await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function findProducerMaxInterval() {
    const query =  `SELECT name AS producer, interval, previousWin, followingWin
            FROM producers
            ORDER BY interval DESC
            LIMIT 2;`
    return await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function findAwards() {
    const max = await findProducerMaxInterval();
    const min = await findProducerMinInterval();

    return {
        min: min,
        max: max
    };
}


export { findAwards };