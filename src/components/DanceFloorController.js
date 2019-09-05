import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Playlist from './Playlist';
import PlaylistControls from './PlaylistControls';
import LayerControls from './LayerControls';
import FloorPreview from './FloorPreview';

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

    render() {
        const { status } = this.state;
        return (
            <Row>
                <Col md={4}>
                    <h4>Playlist</h4>
                    <Playlist playlist={status.playlist} />
                    <PlaylistControls 
                        onPrevious={this.onPlaylistPrevious}
                        onStay={this.onPlaylistStay}
                        onNext={this.onPlaylistNext}
                        onStop={this.onPlaylistStop} />
                    <LayerControls
                        layerInfo={status.layers ? status.layers.playlist : {}}
                        onAlphaChange={(obj, value) => this.onLayerParamChange('playlist', 'alpha', value)}
                        onWetDryChange={(obj, value) => this.onLayerParamChange('playlist', 'ranged_values', { '0': value })}
                        onIntensityChange={(obj, value) => this.onLayerParamChange('playlist', 'ranged_values', { '1': value })}
                        />
                </Col>
                <Col md={4} className="text-center">
                    <h4>Main</h4>
                    <FloorPreview />
                </Col>
                <Col md={4} className="text-right">
                    <h4>Layers</h4>
                </Col>
            </Row>
        )
    }
};