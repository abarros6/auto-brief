import React, {useState} from 'react';
import Quill from './Quill';
const Viewer = ({document, setDocument, content,viewerRef}) => {
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