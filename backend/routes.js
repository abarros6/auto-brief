import express from 'express';
import {generateSummary} from './generateSummary.js';
import multer from 'multer';
import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import summary from './summary.json' assert {type: 'json'}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// POST route to handle PDF upload and conversion to text
router.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);

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

            res.send({'summary': summary, 'pdfText': data.text.replace(/(\r\n|\n|\r)/gm, "")}).status(200)

            //this is the gpt call below
            //generateSummary(data.text).then((a)=>{res.status(200).send(a)});
        }).catch(parseErr => {
            res.status(500).send('Error parsing PDF.');
        });
    });
});


export default router;