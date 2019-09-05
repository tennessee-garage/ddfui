import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Row, Col } from 'react-bootstrap';

const LayerSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
  
export default function LayerControls({ layerInfo, onAlphaChange, onIntensityChange, onWetDryChange }) {

    return (
        <div>
            <Row>
                <Col md={3}>
                    <b>alpha</b>
                </Col>
                <Col>
                    <LayerSlider
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
                <Col md={3}>
                    <b>wet/dry</b>
                </Col>
                <Col>
                    <LayerSlider
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
                <Col md={3}>
                    <b>intensity</b>
                </Col>
                <Col>
                    <LayerSlider
                        valueLabelDisplay="auto"
                        aria-label="intensity slider"
                        defaultValue={127}
                        min={0}
                        max={127}
                        step={1}
                        onChange={onWetDryChange}
                        />
                </Col>
            </Row>
        </div>
    );
};