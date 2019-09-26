import React from 'react';
import Config from '../config.js'; 

export default function FloorPreview() {
    const url = `${Config.DDF_PREVIEW_URL}?is_embedded=true`;
    return (
        <div style={{
            width: '100%',
            marginBottom: 16}}>
            <iframe style={{border: 0}} src={url} title="floor preview"></iframe>
         </div>
    );
};