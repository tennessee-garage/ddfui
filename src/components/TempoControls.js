import React from 'react';
import BPMTapper from './BPMTapper';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function TempoControls({ bpm, onBpmChange, onNudgeTempo }) {
    const onNudgeBpmLeft = () => {
        onNudgeTempo(-0.1, null);
    };
    const onNudgeBpmRight = () => {
        onNudgeTempo(0.1, null);
    };
    const onNudgeDownbeatLeft = () => {
        onNudgeTempo(0, -100);
    };
    const onNudgeDownbeatRight = () => {
        onNudgeTempo(0, 100);
    };

    return (
        <div style={{marginBottom: 16}}>
            <InputGroup className="mb-3">
                <FormControl
                    type="number"
                    min="40.0"
                    max="220.0"
                    step="0.1"
                    value={bpm}
                    onChange={(e) => onBpmChange(e.target.value)} />
                <InputGroup.Append>
                    <InputGroup.Text>BPM</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            <div style={{marginBottom: 16}}>
                <BPMTapper onBpmChange={onBpmChange} />
            </div>
            <div className="btn-group d-flex" role="group" style={{marginBottom: 16}}>
                <Button variant="secondary" onClick={onNudgeBpmLeft} className="w-100">Slower</Button>
                <Button variant="secondary" disabled className="w-100">BPM</Button>
                <Button variant="secondary" onClick={onNudgeBpmRight} className="w-100">Faster</Button>
            </div>
            <div className="btn-group d-flex" role="group" style={{marginBottom: 16}}>
                <Button variant="secondary" onClick={onNudgeDownbeatLeft} className="w-100">Earlier</Button>
                <Button variant="secondary" disabled className="w-100">Downbeat</Button>
                <Button variant="secondary" onClick={onNudgeDownbeatRight} className="w-100">Later</Button>
            </div>
        </div>
    );
};