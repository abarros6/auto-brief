import express from 'express';
import {generateSummary} from './generateSummary.js';
import multer from 'multer';
import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// async function streamToString(stream) {
//     // lets have a ReadableStream as a stream variable
//     const chunks = [];

//     for await (const chunk of stream) {
//         chunks.push(Buffer.from(chunk));
//     }

//     return Buffer.concat(chunks).toString("utf-8");
// }

router.post('/generate-summary', async (req, res) => {
    const { decision } = req.body;
    //const summary = await generateSummary(decision);
    res.status(200).send({summary: 'summary'});
});

// router.post('/upload-pdf', async (req, res) => {
//     const { pdf } = req.body;
    
//     res.status(200).send({text: streamToString(pdf)});
    
// });


const upload = multer({ dest: 'uploads/' });

// POST route to handle PDF upload and conversion to text
router.post('/upload-pdf', upload.single('pdf'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    // Read the uploaded PDF file
    fs.readFile(filePath, (err, dataBuffer) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Parse the PDF file
        pdf(dataBuffer).then(data => {
            // Delete the file after parsing
            fs.unlink(filePath, unlinkErr => {
                if (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                }
            });
            
            // Send the extracted text as the response
            res.send(generateSummary(data.text));
        }).catch(parseErr => {
            res.status(500).send('Error parsing PDF.');
        });
    });
});

export default router;