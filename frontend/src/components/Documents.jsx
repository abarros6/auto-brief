import Viewer from './Viewer.jsx'
import Editor from './Editor'

function Document ({content, setContent, document, setDocument, viewerRef, editorRef}) {
    return (
        <div className='flex flex-row'>
            <Viewer document={document} setDocument={setDocument} viewerRef={viewerRef}/>
            <div className="divider h-full divider-horizontal"/> 
            <Editor content={content} setContent={setContent} editorRef={editorRef}/>
        </div>
    )
}

export default Document