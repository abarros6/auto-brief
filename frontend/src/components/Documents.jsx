import Viewer from './Viewer.jsx'
import Editor from './Editor'

function Document ({content, setContent, document, setDocument, viewerRef, editorRef}) {
    return (
        <div className='flex flex-col lg:flex-row gap-8'>
            <Viewer document={document} setDocument={setDocument} viewerRef={viewerRef}/>
            {/* <div className="divider h-full divider-horizontal"/>  */}
            {
                content && <Editor content={content} setContent={setContent} editorRef={editorRef}/>
            }
        </div>
    )
}

export default Document