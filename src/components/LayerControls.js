import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Slider from './Slider';
  
export default function LayerControls({ layerInfo, onAlphaChange, onIntensityChange, onWetDryChange }) {

    return (
        <div>
            <Row>
                <Col md={5}>
                    <b>alpha</b>
                </Col>
                <Col>
                    <Slider
                        valueLabelDisplay="auto"
                        aria-label="alpha slider"
                        defaultValue={100}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={onAlphaChange}
                        />
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <b>wet/dry</b>
                </Col>
                <Col>
                    <Slider
                        valueLabelDisplay="auto"
                        aria-label="wet/dry slider"
                        defaultValue={127}
                        min={0}
                        max={127}
                        step={1}
                        onChange={onWetDryChange}
                        />
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <b>intensity</b>
                </Col>
                <Col>
                    <Slider
                        valueLabelDisplay="auto"
                        aria-label="intensity slider"
                        defaultValue={127}
                        min={0}
                        max={127}
                        step={1}
                        onChange={onIntensityChange}
                        />
                </Col>
            </Row>
        </div>
    );
};