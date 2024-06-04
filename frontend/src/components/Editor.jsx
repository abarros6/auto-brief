import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { downloadObjectAsJson } from "../utils/download.js";

function Editor({content, setContent}) {

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

    // const importDocument = (event) => {
    //     const Jsonfile = event.target.files?.[0];
    //     var reader = new FileReader();

    //     if (!Jsonfile) return;

    //     reader.readAsText(Jsonfile, "UTF-8");
    //     reader.onload = function (evt) {
    //         const delta = JSON.parse(evt.target?.result);
    //         editorRef.current?.editor?.setContents(delta);
    //     };
    // };

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
    }, []) 

    const generateText = () => {
        let brief = content.brief
        let citations = content.citations
        let text = `Brief: `
        text += `Facts: ${brief.facts}`
        text += `Issues: ${brief.issues}`
        text += `Held: ${brief.held}`
        text += `Ratio: ${brief.ratio}`
        text += `Reasoning: ${brief.reasoning}`
        text += `Policy: ${brief.policy}`
        text += `Citations:`
        // for (let i = 0; i < citations.length; i++) {
        //     text += `${citations[i]}`
        // }

        let keys = Object.keys(citations)

        for (let i = 0; i < keys.length; i++) {
            let citation = citations[keys[i]]
            citation.map((category, index) => { 
                text += `${category}`
            })
        }
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
                {/* <input
                    id="import-file"
                    type="file"
                    className="button"
                    onChange={importDocument}
                    title="Import file"
                    hidden={true}
                />
                <button className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                    <label
                    style={{ height: "100%", width: "100%" }}
                    htmlFor="import-file"
                    className="custom-file-upload"
                    >
                    Import file
                    </label>
                </button> */}
                <button className='m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={clearDocument}>
                    Clear document
                </button>
                </div>
                <ReactQuill
                defaultValue={JSON.parse(localStorage.getItem("document") || "[]")}
                style={{ height: "60vh", width: "100%" }}
                theme="snow"
                value={value}
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
        </>
    )
}



export default Editor