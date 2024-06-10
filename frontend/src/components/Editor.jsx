import React, { useState, useEffect, useRef } from 'react';
import Quill from './Quill';

function Editor({content, setContent, editorRef}) {

    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem("document") || "[]")
    );

    const colors = [
        'hsla(0, 100%, 50%, 0.5)', 'hsla(120, 100%, 50%, 0.5)', 'hsla(240, 100%, 50%, 0.5)', 
        'hsla(60, 100%, 50%, 0.5)', 'hsla(300, 100%, 50%, 0.5)', 'hsla(180, 100%, 50%, 0.5)'
    ];

    useEffect(() => {
        generateText()
    }, [content]) 

    const editorStyles = {
        header: 'text-align: center'
    }

    const generateText = () => {
        let brief = content.brief
        let citations = content.citations
        let text = `<h1 style = '${editorStyles.header}'>Brief</h1><br>`
        text += `<h3>Facts:</h3><br>${brief.facts}`
        text += `<br><br><h3>Issues:</h3><br>${brief.issues}`
        text += `<br><br><h3>Held:</h3><br>${brief.held}`
        text += `<br><br><h3>Ratio:</h3><br>${brief.ratio}`
        text += `<br><br><h3>Reasoning:</h3><br>${brief.reasoning}`
        text += `<br><br><h3>Policy:</h3><br>${brief.policy}`
        text += `<br><br><h1 style = '${editorStyles.header}'>Citations</h1>`
    

        let keys = Object.keys(citations)

        for (let i = 0; i < keys.length ; i++) {
            let citation = citations[keys[i]]
            
            citation.map((category) => {
                text += `<br><span style="background-color: ${colors[i]};">${category}</span><br>`
            })
        }
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