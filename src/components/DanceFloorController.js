import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Playlist from './Playlist';
import PlaylistControls from './PlaylistControls';

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