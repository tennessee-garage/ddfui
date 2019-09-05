import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default function PlaylistControls({ onPrevious, onNext, onStay, onStop }) {
    return (
        <div>
            <ButtonGroup aria-label="Main controls">
                <Button variant="secondary" onClick={onPrevious}>Prev</Button>
                <Button variant="secondary" onClick={onStay}>Stay</Button>
                <Button variant="secondary" onClick={onNext}>Next</Button>
            </ButtonGroup>
        </div>
    );
};