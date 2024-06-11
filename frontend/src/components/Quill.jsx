import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from 'react';

function Quill ({value, setValue, reference, readOnly, color = ''}) {

    const modules = useMemo(() => ({
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
    }), []);
    
    //maybe add an array prop customActions that takes an array of event handlers
    //to add to the quill toolbar as custom actions 
    //use this to implement the up and down buttons that cycle throught the citations

    return (
        <ReactQuill
            defaultValue={JSON.parse(localStorage.getItem("document") || "[]")}
            style={{  height: "calc(100% - 42px)", width: "100%", overflow: "hidden", backgroundColor: color }}
            className='mb-10 z-0'
            theme="snow"
            value={value}
            onChange={setValue}
            readOnly={readOnly}
            modules={modules}
            ref={reference}
        /> 
    )
}

export default Quill