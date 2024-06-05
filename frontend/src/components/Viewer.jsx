import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Viewer = ({document, setDocument, viewerRef}) => {

    return (
        <ReactQuill
            defaultValue={JSON.parse(localStorage.getItem("document") || "[]")}
            style={{ height: "60vh", width: "100%" }}
            theme="snow"
            value={document}
            onChange={setDocument}
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
            ref={viewerRef}
        />  
    )
}

export default Viewer