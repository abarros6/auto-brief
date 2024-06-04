import React from 'react';

import PdfGenerator from './pdfGenerator';

const App = () => {

  // Function to generate PDF when the button is clicked
  const generatePdf = () => {
    PdfGenerator();
  }

  // Render the main content
  return (
    <div className='flex flex-col justify-center text-center min-h-screen p-8'>
      <div>
        <p className='p-8'>Click here to download the PDF file.</p>
        <div style={{display:"flex",justifyContent:"center"}}>
          <button
            onClick={generatePdf}
          >
            Download
          </button>
        </div>
        <div className='h-screen' id='pdf-viewer'>
        </div>
      </div>
    </div>
  )
}

export default App
