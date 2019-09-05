import React from 'react';
import { Button } from 'react-bootstrap';

export default function PlaylistControls({ onPrevious, onNext, onStay, onStop }) {
    return (
        <div style={{marginBottom: 16}}>
            <div className="btn-group d-flex" role="group" style={{marginBottom: 16}}>
                <Button variant="secondary" onClick={onPrevious} className="w-100">Prev</Button>
                <Button variant="secondary" onClick={onStay} className="w-100">Stay</Button>
                <Button variant="secondary" onClick={onNext} className="w-100">Next</Button>
            </div>
            <Button variant="secondary" onClick={onStop} block>Stop</Button>
        </div>
    );
};