import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Documents from './components/Documents.jsx';
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { downloadObjectAsJson } from "./utils/download.js";
import * as quillToWord from "quill-to-word";



const App = () => {
  const [pdf, setPdf] = useState(null);
  // const [content, setContent] = useState({
  //     brief:{},
  //     citations: {},
  // });
  const [uploaded, setUploaded] = useState(false);
  const [content, setContent] = useState(null);
  const [document, setDocument] = useState('')
  const editorRef = useRef(null);
  const viewerRef = useRef(null);

  const exportDocument = () => {
      const deltas = editorRef.current?.editor?.getContents();
      if (!deltas) {
          return alert("Content not found");
      }
      downloadObjectAsJson(deltas.ops, "editor-text");
  };

  const exportAsDOCX = async () => {
      const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
      const configuration = {
          exportAs: 'blob' // could also be 'buffer', 'base64', or 'doc'
      }
      const docxAsBlob = await quillToWord.generateWord(delta, configuration); // converts to DOCX
      saveAs(docxAsBlob, "docx-export.docx"); // downloads from the browser
  };

  const exportAsPDF = async () => {
      const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
      const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
      saveAs(pdfAsBlob, "pdf-export.pdf"); // downloads from the browser
  };

  const clearDocument = () => {
      editorRef.current?.editor?.deleteText(0, Infinity);
  };

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
          setDocument(spotPara(text))
          setUploaded(true)

      } catch (error) {
          console.error(error);
      }
  }

  return (
    <div className='flex flex-col text-center min-h-screen p-8'>
      <Navbar 
        uploadOnClick={uploadOnClick} 
        handleFileChange={handleFileChange}
        exportAsPDF={exportAsPDF}
        clearDocument={clearDocument}
        exportDocument={exportDocument}  
        exportAsDOCX={exportAsDOCX}
        uploaded={uploaded}
      />
      <h1 className='p-8 text-4xl'>Auto-Brief</h1>
      <Documents
        content={content}
        setContent={setContent}
        editorRef={editorRef}
        document={document}
        setDocument={setDocument}
        viewerRef={viewerRef}
      />
    </div>
  )
}

const spotPara = (text) => {
  // Define the regular expression to find square brackets containing numbers
  const regex = /\[(\d+)\]/g;

  // Use the replace method to inject line breaks and wrap the matched content in <h3> tags
  const transformedString = text.replace(regex, (match, p1) => {
      return `<br><h3>${match}</h3>`;
  });

  return transformedString;
}

export default App
