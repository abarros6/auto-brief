import React, { useState, useEffect, useRef } from 'react';
import Quill from './Quill';

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
        let text = ``
        text += `<h3>Facts:</h3> ${brief.facts}`
        text += `<br><h3>Issues:</h3> ${brief.issues}`
        text += `<br><h3>Held:</h3> ${brief.held}`
        text += `<br><h3>Ratio:</h3> ${brief.ratio}`
        text += `<br><h3>Reasoning:</h3> ${brief.reasoning}`
        text += `<br><h3>Policy:</h3> ${brief.policy}`
        // text += `Citations:`

        let keys = Object.keys(citations)

        // for (let i = 0; i < keys.length; i++) {
        //     let citation = citations[keys[i]]
        //     citation.map((category, index) => { 
        //         text += `${category}`
        //     })
        // }
        setValue(text)
    }
    
    
    return (        
        <Quill
            value={value}
            setValue={setValue}
            reference={editorRef}
            readOnly={false}
        />  

    )
}



export default Editor