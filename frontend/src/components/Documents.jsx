import Viewer from './Viewer.jsx'
import Editor from './Editor'

function Documents ({colors, content, setContent, document, setDocument, viewerRef, editorRef}) {
    return (
        <div className='flex flex-col lg:flex-row gap-8 '>
            {
                content ? <Viewer document={document} content={content} setDocument={setDocument} viewerRef={viewerRef}/> :
                <div className="skeleton w-full h-[75vh]"></div>
            }
            {/* <div className="divider h-full divider-horizontal"/>  */}
            {
                content ? <Editor colors = {colors} content={content} setContent={setContent} editorRef={editorRef}/> :
                <div className="skeleton w-full h-[75vh] mb-4"></div>
            }
        </div>
    )
}

export default Documents