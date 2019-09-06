import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Playlist from './Playlist';
import PlaylistControls from './PlaylistControls';
import LayerControls from './LayerControls';
import FloorPreview from './FloorPreview';
import ProcessorChooser from './ProcessorChooser';
import TempoControls from './TempoControls';

import DanceFloorClient from '../lib/DanceFloorClient';
const CLIENT = new DanceFloorClient();

export default class DanceFloorController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {
            },
        };
        this.statusPoller = null;
    }

    componentDidMount() {
        // Fetch initial status.
        CLIENT.getStatus().then((status) => {
            console.log(status)
            this.setState({ status });
        });
        this.statusPoller = setInterval(async () => {
            await this.refreshStatus();
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.statusPoller);
    }

    refreshStatus = async () => {
        const status = await CLIENT.getStatus();
        this.setState({ status });
    };

    onPlaylistPrevious = async () => {
        await CLIENT.playlistPrevious();
        await this.refreshStatus();
    };

    onPlaylistStay = async () => {
        await CLIENT.playlistStay();
        await this.refreshStatus();
    };

    onPlaylistNext = async () => {
        await CLIENT.playlistAdvance();
        await this.refreshStatus();
    };

    onPlaylistStop = async () => {
        await CLIENT.playlistStop();
        await this.refreshStatus();
    };

    onLayerParamChange = async (layerName, paramName, value) => {
        await CLIENT.setLayer(layerName, { [paramName]: value });
        await this.refreshStatus();
    };

    onLayerProcesorChange = async (layerName, processorName) => {
        await CLIENT.setLayer(layerName, { processor_name: processorName });
        await this.refreshStatus();
    };

    onBpmChange = async (bpm) => {
        await CLIENT.setTempo(bpm);
        await this.refreshStatus();
    };

    onNudgeTempo = async (bpmDelta, downbeatDelta) => {
        await CLIENT.nudgeTempo(bpmDelta, downbeatDelta);
        await this.refreshStatus();
    };

    render() {
        const { status } = this.state;
        const processors = status.processors ? Object.values(status.processors) : [];
        if (!status.layers) {
            // Status not yet loaded.
            // TODO(mikey): Show a throbber.
            return null;
        }
        return (
            <Row>
                <Col md={4}>
                    <div className="ddf-panel">
                        <h5>Playlist</h5>
                        <Playlist playlist={status.playlist} />
                        <PlaylistControls 
                            isEnabled={status.layers.playlist.enabled}
                            onSetEnabled={(v) => this.onLayerParamChange('playlist', 'enabled', !!v)}
                            onPrevious={this.onPlaylistPrevious}
                            onStay={this.onPlaylistStay}
                            onNext={this.onPlaylistNext} />
                        <LayerControls
                            layerInfo={status.layers ? status.layers.playlist : {}}
                            onAlphaChange={(value) => this.onLayerParamChange('playlist', 'alpha', value)}
                            onWetDryChange={(value) => this.onLayerParamChange('playlist', 'ranged_values', { '0': value })}
                            onIntensityChange={(value) => this.onLayerParamChange('playlist', 'ranged_values', { '1': value })}
                            />
                    </div>
                </Col>
                <Col md={4}>
                    <h5>Main</h5>
                    <FloorPreview />
                    <TempoControls
                        bpm={status.tempo.bpm}
                        onBpmChange={this.onBpmChange}
                        onNudgeTempo={this.onNudgeTempo} />
                </Col>
                <Col md={4}>
                    <div className="ddf-panel">
                        <h5>Layers</h5>
                        <Card bg="light" style={{ width: '18rem' }}>
                            <Card.Header>Overlay 1</Card.Header>
                            <Card.Body>
                                <ProcessorChooser
                                    value={status.layers ? status.layers.overlay1.processor_name || '' : ''}
                                    processors={processors}
                                    onChange={(e) => this.onLayerProcesorChange('overlay1', e.target.value)} />
                                <LayerControls
                                    layerInfo={status.layers ? status.layers.overlay1 : {}}
                                    onAlphaChange={(value) => this.onLayerParamChange('overlay1', 'alpha', value)}
                                    onWetDryChange={(value) => this.onLayerParamChange('overlay1', 'ranged_values', { '0': value })}
                                    onIntensityChange={(value) => this.onLayerParamChange('overlay1', 'ranged_values', { '1': value })}
                                    />
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card bg="light" style={{ width: '18rem' }}>
                            <Card.Header>Overlay 2</Card.Header>
                            <Card.Body>
                                <ProcessorChooser
                                    value={status.layers ? status.layers.overlay2.processor_name || '' : ''}
                                    processors={processors}
                                    onChange={(e) => this.onLayerProcesorChange('overlay2', e.target.value)} />
                                <LayerControls
                                    layerInfo={status.layers ? status.layers.overlay2 : {}}
                                    onAlphaChange={(value) => this.onLayerParamChange('overlay2', 'alpha', value)}
                                    onWetDryChange={(value) => this.onLayerParamChange('overlay2', 'ranged_values', { '0': value })}
                                    onIntensityChange={(value) => this.onLayerParamChange('overlay2', 'ranged_values', { '1': value })}
                                    />
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
};