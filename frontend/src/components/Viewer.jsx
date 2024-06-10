import React, {useEffect} from 'react';
import Quill from './Quill';
const Viewer = ({content, document, setDocument, viewerRef}) => {

    const citations = content.citations

    const colors = [
        'hsla(0, 100%, 50%, 0.5)', 'hsla(120, 100%, 50%, 0.5)', 'hsla(240, 100%, 50%, 0.5)', 
        'hsla(60, 100%, 50%, 0.5)', 'hsla(300, 100%, 50%, 0.5)', 'hsla(180, 100%, 50%, 0.5)'
    ];

    const generateText = () => {

        let documentWithHighlights = document.slice()

        let keys = Object.keys(citations)

        for (let i = 0; i < keys.length ; i++) {
            let category = citations[keys[i]]
            
            category.map((text) => {
                documentWithHighlights = documentWithHighlights.replace(text, `<span style="background-color: ${colors[i]};">${text}</span>`)
            })
        }
        setDocument(documentWithHighlights)
    }

    useEffect(() => {
        generateText()
    }, [content, document])



    return (
        <Quill
            value={document}
            setValue={setDocument}
            reference={viewerRef}
            readOnly={true}
            color={'#e0e0e0'}
        />  
    )
}

export default Viewer