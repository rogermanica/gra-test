import { Request, Response } from 'express';
import { findAwards } from '../services/awardService';

const getProducers = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await findAwards();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { getProducers };