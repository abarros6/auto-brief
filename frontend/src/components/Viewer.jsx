import React, {useState} from 'react';
import Quill from './Quill';
const Viewer = ({document, setDocument, viewerRef}) => {

    return (
        <Quill
            value={document}
            setValue={setDocument}
            ref={viewerRef}
        />  
    )
}

export default Viewer