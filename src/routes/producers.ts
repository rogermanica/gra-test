import express from 'express';
import { getProducers } from '../controllers/producersController';
const router = express.Router();

router.get('/producers', getProducers);

export default router;