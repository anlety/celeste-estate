import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import { bookListing } from '../controllers/booking.controller.js';
const router = express.Router()

router.post('/',verifyToken, bookListing)

export default router;