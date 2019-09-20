import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import DanceFloorClient from '../lib/DanceFloorClient';
const CLIENT = new DanceFloorClient();

// Source: https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w-]+/g, '') // Remove all non-word characters
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

export default class PlaylistChooser extends React.Component {
    state = {
        allPlaylists: {},
        showChooserModal: false,
        showUploadModal: false,
    };

    async componentDidMount() {
        const allPlaylists = await CLIENT.getPlaylists();
        this.setState({ allPlaylists });
    }

    onPlaylistSelected = async (e) => {
        this.setState({ showChooserModal: false });
        const playlistName = e.target.value;
        const playlist = await CLIENT.activatePlaylist(playlistName);
        this.props.onChange(playlist);
    };

    onFileUploaded = (e) => {
        const files = e.target.files;
        if (!files.length) {
            return;
        }

        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            this.onFileContentsAvailable(e.target.result);
        };
        reader.readAsText(file);
    };

    onFileContentsAvailable = async (data) => {
        this.setState({ showUploadModal: false });
        const parsed = JSON.parse(data);
        const title = parsed.title || 'playlist';
        const name = slugify(title);
        const playlist = await CLIENT.uploadPlaylist(name, parsed);
        this.setState((prevState) => {
            return {
                allPlaylists: {
                    ...prevState.allPlaylists,
                    [name]: playlist,
                },
            };
        });
        await CLIENT.activatePlaylist(name);
        this.props.onChange(playlist);
    }

    onHideChooserModal = () => {
        this.setState({ showChooserModal: false });
    };

    onHideUploadModal = () => {
        this.setState({ showUploadModal: false });
    };

    onSelectPlaylist = () => {
        this.setState({ showChooserModal: true });
    };

    onUploadPlaylist = () => {
        this.setState({ showUploadModal: true });
    };

    render() {
        const { allPlaylists, showChooserModal, showUploadModal } = this.state;
        const entries = Object.entries(allPlaylists)
        const playlistOptions = entries.map(([name, playlist]) => {
            return <option value={name} key={name}>{playlist.title}</option>
        });

        return (
            <>
                <Modal show={showChooserModal} onHide={this.onHideChooserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Playlist</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Control as="select" onChange={this.onPlaylistSelected}>
                                <option value="">Select a playlist...</option>
                                {playlistOptions}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onHideChooserModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showUploadModal} onHide={this.onHideUploadModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Playlist</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input type="file" name="file" onChange={this.onFileUploaded}/>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.onHideUploadModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <div style={{marginBottom: 16}}>
                    <div className="btn-group d-flex" role="group" style={{marginBottom: 16}}>
                        <Button variant="secondary" onClick={this.onSelectPlaylist} className="w-100">Change Playlist</Button>
                        <Button variant="secondary" onClick={this.onUploadPlaylist} className="w-100">Upload Playlist</Button>
                    </div>
                </div>
            </>
        )
    }
}
