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
            year AS followingWin,
            previousWin,
            interval
        FROM 
            AwardIntervals
        WHERE 
            previousWin IS NOT NULL
    ),

    MaxInterval AS (
        SELECT 
            MAX(interval) AS max_interval
        FROM 
            FilteredIntervals
    )

    SELECT 
        f.producer,
        f.interval,
        f.previousWin,
        f.followingWin
    FROM 
        FilteredIntervals f
    JOIN 
        MaxInterval m
    ON 
        f.interval = m.max_interval
    ORDER BY 
        f.producer;`;
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
            year AS followingWin,
            previousWin,
            interval
        FROM 
            AwardIntervals
        WHERE 
            previousWin IS NOT NULL
    ),

    MinInterval AS (
        SELECT 
            MIN(interval) AS min_interval
        FROM 
            FilteredIntervals
    )

    SELECT 
        f.producer,
        f.interval,
        f.previousWin,
        f.followingWin
    FROM 
        FilteredIntervals f
    JOIN 
        MinInterval m
    ON 
        f.interval = m.min_interval
    ORDER BY 
        f.producer;`;

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