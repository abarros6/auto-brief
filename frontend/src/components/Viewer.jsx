import PdfGenerator from '../pdfGenerator.js';
import React, {useState} from 'react';

const Viewer = () => {
    const [pdf, setPdf] = useState(null);
    const [text, setText] = useState('')
  
    const handleFileChange = (event) => {
      setPdf(event.target.files[0]);
    };

    const generateSummary = async (decision) => {
        const brief = {
            facts: 'some facts',
            issues: 'some issues',
            held: 'some held',
            ratio: 'some ratio',
            reasoning: 'some reasoning',
            policy: 'some policy'
        };
        const response = await fetch('http://localhost:3000/api/generate-summary', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(brief)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    }

    const uploadPdf = async (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('pdf', file);
      
        const response = await fetch('http://localhost:3000/api/upload-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: formData
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.data.text();

        setText(data)
        return data;
    }
    
    const uploadOnClick = async () => {
        const file = document.getElementById('file-input').files[0]
        try {
            const response = await uploadPdf(file);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    
    const generatePdf = () => {
        PdfGenerator();
    }
    
    return (
        <div>
            <div className='flex flex-row justify-center'>
                <button
                    onClick={generatePdf}
                    className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                    Download
                </button>
                <button
                    onClick={uploadOnClick}
                    className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                    upload
                </button>
                <div>
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                    {pdf && <p>Selected PDF: {pdf.name}</p>}
                </div>
            </div>
            <div className='h-screen' id='pdf-viewer'>
            </div>
            {
                text && (
                    <div>
                        <h2>Extracted Text:</h2>
                        <div className="border border-gray-300 p-4">{text}</div>
                    </div>
                )
            }
      </div>
    )
}

export default Viewer