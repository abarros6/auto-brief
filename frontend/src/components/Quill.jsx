import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Quill ({value, setValue, reference, readOnly, color = ''}) {
    
    return (
        <ReactQuill
            defaultValue={JSON.parse(localStorage.getItem("document") || "[]")}
            style={{ height: "100vh", width: "100%", overflow: "hidden", backgroundColor: color }}
            theme="snow"
            value={value}
            onChange={setValue}
            readOnly={readOnly}
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
            ref={reference}
        /> 
    )
}

export default Quill