import React from 'react';

export default function FloorPreview() {
    const url = 'http://localhost:1979?is_embedded=true';
    return (
        <div style={{
            width: '100%',
            marginBottom: 16}}>
            <iframe style={{border: 0}} src={url} title="floor preview"></iframe>
         </div>
    );
};