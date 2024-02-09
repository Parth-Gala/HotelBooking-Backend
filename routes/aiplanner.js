import express from 'express'
import { gethotelBasedCity } from '../controllers/itinerary.js';


const router = express.Router()

router.get('/:city', gethotelBasedCity);

export default router;