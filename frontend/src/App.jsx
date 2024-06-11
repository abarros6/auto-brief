import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Documents from './components/Documents.jsx';
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { downloadObjectAsJson } from "./utils/download.js";
import * as quillToWord from "quill-to-word";
import formatter from './utils/pdfFormat.js';



const App = () => {
  const [pdf, setPdf] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [content, setContent] = useState(null);
  const [document, setDocument] = useState(null)
  const editorRef = useRef(null);
  const viewerRef = useRef(null);

  const colors = [
      'hsla(0, 100%, 50%, 0.5)', 'hsla(120, 100%, 50%, 0.5)', 'hsla(240, 100%, 50%, 0.5)', 
      'hsla(60, 100%, 50%, 0.5)', 'hsla(300, 100%, 50%, 0.5)', 'hsla(180, 100%, 50%, 0.5)'
  ];

  const editorStyles = {
    header: 'text-align: center'
  }

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

          let editorText = `<h1 style = '${editorStyles.header}'>Brief</h1><br>`
          editorText += `<h3>Facts:</h3><br>${brief.facts}`
          editorText += `<br><br><h3>Issues:</h3><br>${brief.issues}`
          editorText += `<br><br><h3>Held:</h3><br>${brief.held}`
          editorText += `<br><br><h3>Ratio:</h3><br>${brief.ratio}`
          editorText += `<br><br><h3>Reasoning:</h3><br>${brief.reasoning}`
          editorText += `<br><br><h3>Policy:</h3><br>${brief.policy}`
          editorText += `<br><br><h1 style = '${editorStyles.header}'>Citations</h1>`
          
          let documentWithHighlights = formatter.removeConsecutiveSpaces(text)

          for (let i = 0; i < Object.keys(citations).length ; i++) {
              citations[Object.keys(citations)[i]].map((text) => {
                  editorText += `<br><span style="background-color: ${colors[i]};">${text}</span><br>`
                  documentWithHighlights = documentWithHighlights.replace(text, `<span  style="background-color: ${colors[i]};">${text}</span>`)
              })
          }
      
          setDocument(formatter.spotPara(documentWithHighlights))
          setContent(editorText);
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
      {/* <h1 className='p-8 text-4xl'>Auto-Brief</h1> */}
      <Documents
        content={content}
        setContent={setContent}
        editorRef={editorRef}
        document={document}
        setDocument={setDocument}
        viewerRef={viewerRef}
        color={colors}
      />
    </div>
  )
}

export default App
