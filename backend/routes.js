import express from 'express';
import {generateSummary} from './generateSummary.js';

const router = express.Router();

router.post('/generate-summary', async (req, res) => {
    const { decision } = req.body;
    //const summary = await generateSummary(decision);
    res.status(200).send({summary: 'summary'});
});

router.post('/upload-pdf', async (req, res) => {
    const { pdf } = req.body;
    
});

export default router;