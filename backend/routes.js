import express from 'express';
import {generateSummary} from './generateSummary.js';

const router = express.Router();

router.post('/generate-summary', async (req, res) => {
    const { decision } = req.body;
    const summary = await generateSummary(decision);
    res.send(summary);
});