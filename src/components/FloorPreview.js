import React from 'react';

export default function FloorPreview() {
    const url = 'http://localhost:1979?is_embedded=true';
    return (
        <div style={{
            width: '100%',
            border: '1px solid #ccc',
            marginBottom: 16}}>
            <iframe src={url} title="floor preview"></iframe>
         </div>
    );
};