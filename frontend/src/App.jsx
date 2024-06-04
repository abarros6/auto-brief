import React, { useState } from 'react';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';
import MyDocument from './components/MyDocument';

function App() {
  const [file, setFile] = useState(null);

  const onFileLoad = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      setFile(fileContent);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col text-center p-8">
      <h1 className="text-3xl m-4 text-bold">Auto-Brief</h1>
      <input
        className="bg-blue"
        type="file"
        accept=".pdf"
        onChange={(event) => onFileLoad(event)}
      />
      <PDFViewer height={800}>
        {/* {file && (
          <Document file={file} options={{ docBaseUrl: '' }}>
            <Page pageNumber={1} />
          </Document>
        )} */}

        <MyDocument file={file} />
      </PDFViewer>
    </div>
  );
}

export default App;