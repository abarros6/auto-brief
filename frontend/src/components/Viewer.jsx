import PdfGenerator from '../pdfGenerator.js';

const Viewer = () => {
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
                    onClick={generatePdf}
                    className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                    upload
                </button>
            </div>
            <div className='h-screen' id='pdf-viewer'>
            </div>
      </div>
    )
}

export default Viewer