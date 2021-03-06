import Config from '../config.js';

export default class DanceFloorClient {
    constructor(baseUrl = Config.DDF_SERVER_URL) {
        this.baseUrl = baseUrl;
    }

    async _request(method, path, data = null) {
        if (!path.startsWith('/')) {
            throw new Error(`Bad path: ${path}`);
        }
        const url = `${this.baseUrl}${path}`;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
        });
        const result = await response.json();
        return result;
    }

    async get(path, data = null) {
        return this._request('GET', path, data);
    }

    async post(path, data = null) {
        return this._request('POST', path, data);
    }

    async patch(path, data = null) {
        return this._request('PATCH', path, data);
    }

    async getStatus() {
        return this.get('/api/status');
    }

    async playlistAdvance() {
        return this.post('/api/playlist/advance');
    }

    async playlistStay() {
        return this.post('/api/playlist/stay');
    }

    async playlistPrevious() {
        return this.post('/api/playlist/previous');
    }

    async setTempo(bpm) {
        return this.post('/api/tempo', { bpm });
    }

    async nudgeTempo(bpmDelta, downbeatMillisDelta) {
        const data = {
            bpm_delta: bpmDelta,
            downbeat_millis_delta: downbeatMillisDelta,
        };
        return this.post('/api/tempo/nudge', data);
    }

    async setLayer(layerName, options) {
        return this.patch(`/api/layers/${layerName}`, options);
    }

    async setBrightness(brightness) {
        return this.post('/api/brightness', { brightness });
    }

    async getPlaylists() {
        return this.get('/api/playlists');
    }

    async activatePlaylist(name) {
        return this.post(`/api/playlists/${name}/activate`);
    }

    async uploadPlaylist(name, data) {
        return this.post(`/api/playlists/${name}`, data);
    }

}