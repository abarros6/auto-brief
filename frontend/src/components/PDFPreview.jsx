import React, { useRef, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const pdfSrc = "/assets/resume.pdf";

const PDFPreview = ({ preview = pdfSrc }) => {
  const canvasRef = useRef(null);
  const [thumb, setThumb] = useState(null);
  if (thumb) return <img src={thumb} alt="pdf preview" className="rounded overflow-hidden" />;
  return (
    <>
      <Document file={preview}>
        <Page
          onRenderSuccess={() => {
            canvasRef?.current?.toBlob((blob) => setThumb(URL.createObjectURL(blob)));
          }}
          height={200}
          canvasRef={canvasRef}
          className="rounded overflow-hidden shadow-lg "
          renderTextLayer={false}
          pageNumber={1}
        />
      </Document>
    </>
  );
};

export default PDFPreview;