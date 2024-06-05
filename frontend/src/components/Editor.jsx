import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { downloadObjectAsJson } from "../utils/download.js";

function Editor({content, setContent, document, setDocument}) {

    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem("document") || "[]")
    );
    const editorRef = useRef(null);

    const exportDocument = () => {
        const deltas = editorRef.current?.editor?.getContents();
        if (!deltas) {
            return alert("Content not found");
        }
        downloadObjectAsJson(deltas.ops, "editor-text");
    };

    const exportAsPDF = async () => {
        const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
        const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
        saveAs(pdfAsBlob, "pdf-export.pdf"); // downloads from the browser
    };

    const clearDocument = () => {
        editorRef.current?.editor?.deleteText(0, Infinity);
    };

    useEffect(() => {
        generateText()
    }, [content]) 

    const generateText = () => {
        let brief = content.brief
        let citations = content.citations
        let text = ``
        text += `<h3>Facts:</h3> ${brief.facts}`
        text += `<br><h3>Issues:</h3> ${brief.issues}`
        text += `<br><h3>Held:</h3> ${brief.held}`
        text += `<br><h3>Ratio:</h3> ${brief.ratio}`
        text += `<br><h3>Reasoning:</h3> ${brief.reasoning}`
        text += `<br><h3>Policy:</h3> ${brief.policy}`
        //text += `<br><br><b>Citations:</b>`
        // for (let i = 0; i < citations.length; i++) {
        //     text += `${citations[i]}`
        // }

        let keys = Object.keys(citations)

        /*for (let i = 0; i < keys.length; i++) {
            let citation = citations[keys[i]]
            citation.map((category, index) => { 
                text += `${category}`
            })
        }*/
        setValue(text)
    }
    
    
    return (
        <>
            <div className="action-container">
                <button className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={exportAsPDF}>
                    Export as PDF
                </button>
                <button className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={exportDocument}>
                    Export as file
                </button>
                <button className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={clearDocument}>
                    Clear document
                </button>
                </div>
                <ReactQuill
                    defaultValue={JSON.parse(localStorage.getItem("document") || "[]")}
                    style={{ height: "60vh", width: "100%" }}
                    theme="snow"
                    value={value}
                    className="ql-editor"
                    size="large"
                    onChange={setValue}
                    modules={{
                        toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        [{ color: [] }],
                        [{ align: [] }],
                        [{ font: [] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ header: 1 }, { header: 2 }],
                        [{ size: ["small", false, "large", "huge"] }],
                        ["blockquote", "code-block"],
                        ["video", "link", "formula"],
                        [{ list: "ordered" }, { list: "bullet" }]
                        ]
                    }}
                    ref={editorRef}
                />
                <ReactQuill
                    defaultValue={JSON.parse(localStorage.getItem("document") || "[]")}
                    style={{ height: "60vh", width: "100%" }}
                    theme="snow"
                    value={document}
                    onChange={setDocument}
                    modules={{
                        toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        [{ color: [] }],
                        [{ align: [] }],
                        [{ font: [] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ header: 1 }, { header: 2 }],
                        [{ size: ["small", false, "large", "huge"] }],
                        ["blockquote", "code-block"],
                        ["video", "link", "formula"],
                        [{ list: "ordered" }, { list: "bullet" }]
                        ]
                    }}
                    ref={editorRef}
                />
        </>
    )
}



export default Editor