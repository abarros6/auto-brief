import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({content, setContent}) {
    const [value, setValue] = useState('init');

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
        <ReactQuill theme="snow" value={value} onChange={setValue} />
    )
}

export default Editor