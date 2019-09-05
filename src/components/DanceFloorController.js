import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class DanceFloorController extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col md={4}>
                    <h4>Playlist</h4>
                </Col>
                <Col md={4}>
                    <h4>Main</h4>
                </Col>
                <Col md={4}>
                    <h4>Layers</h4>
                </Col>
            </Row>
        )
    }
};