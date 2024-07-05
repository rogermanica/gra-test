import Producer from '../models/producer';
import sequelize from '../db';
import { QueryTypes } from 'sequelize';


async function findProducerMaxInterval() {
    const query = `
    WITH AwardIntervals AS (
    SELECT 
        name AS producer,
        year,
        LAG(year) OVER (PARTITION BY name ORDER BY year) AS previousWin,
        year - LAG(year) OVER (PARTITION BY name ORDER BY year) AS interval
    FROM 
        producers
    WHERE 
        winner = 1
    ),

    FilteredIntervals AS (
        SELECT 
            producer,
            year,
            previousWin,
            interval
        FROM 
            AwardIntervals
        WHERE 
            previousWin IS NOT NULL
    )

    SELECT 
        producer,
        interval,
        previousWin,
        year AS followingWin  
    FROM 
        FilteredIntervals
    ORDER BY 
        interval DESC,
        producer
    LIMIT 1;`;
    return await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function findProducerMinInterval() {
    const query = `
    WITH AwardIntervals AS (
    SELECT 
        name AS producer,
        year,
        LAG(year) OVER (PARTITION BY name ORDER BY year) AS previousWin,
        year - LAG(year) OVER (PARTITION BY name ORDER BY year) AS interval
    FROM 
        producers
    WHERE 
        winner = 1
    ),

    FilteredIntervals AS (
        SELECT 
            producer,
            year,
            previousWin,
            interval
        FROM 
            AwardIntervals
        WHERE 
            previousWin IS NOT NULL
    )

    SELECT 
        producer,
        interval,
        previousWin,
        year AS followingWin
    FROM 
        FilteredIntervals
    ORDER BY 
        interval ASC,
        producer
    LIMIT 1;
        `;

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