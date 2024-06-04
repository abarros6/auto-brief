import PdfGenerator from '../utils/pdfGenerator.js';
import React, {useState} from 'react';
import Editor from './Editor.jsx';

const Viewer = () => {
    const [pdf, setPdf] = useState(null);
    const [content, setContent] = useState({
        brief:{},
        citations: {},
    });
    const [document, setDocument] = useState('')
  
    const handleFileChange = (event) => {
      setPdf(event.target.files[0]);
    };

    const uploadPdf = async (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('pdf', file);
      
        const response = await fetch('http://localhost:3000/api/upload-pdf', {
          method: 'POST',
          body: formData
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        return data;
    }
    
    const uploadOnClick = async () => {
        try {
            const response = await uploadPdf(pdf);
            let brief = response.summary.brief
            let citations = response.summary.citations
            let text = response.pdfText

            setContent({brief: brief, citations: citations});
            setDocument(text)

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
                    <input className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'type="file" accept=".pdf" onChange={handleFileChange} />
                    {/* {pdf && <p>Selected PDF: {pdf.name}</p>} */}
                </div>
            </div>
            {/* {
                content && (
                    <Editor
                        content={content}
                        setContent={setContent}
                    />
                )
            } */}
            <Editor
                content={content}
                setContent={setContent}
                document={document}
                setDocument={setDocument}
            />
            {/* <div className='h-screen' id='pdf-viewer'/> */}
            
      </div>
    )
}

export default Viewer