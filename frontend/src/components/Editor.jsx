import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Editor({content, setContent, editorRef}) {

    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem("document") || "[]")
    );

    useEffect(() => {
        generateText()
    }, [content]) 

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

    )
}



export default Editor