import Quill from './Quill';

function Editor({content, setContent, editorRef}) {
    
    return (        
        <Quill
            value={content}
            setValue={setContent}
            reference={editorRef}
            readOnly={false}
        />  

    )
}

export default Editor