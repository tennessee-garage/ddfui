import React from 'react';
import { Button } from 'react-bootstrap';

export default class BPMTapper extends React.Component {
    state = {
        taps: [],
        tapTimeout: null,
    }

    onHaveFourTaps = (taps) => {
        const intervals = [
            taps[1] - taps[0],
            taps[2] - taps[1],
            taps[3] - taps[2]
        ];
    
        const secondsPerBeat = (intervals[0] + intervals[1] + intervals[2]) / 3 / 1000;
        const beatsPerSecond = 1 / secondsPerBeat;
        let beatsPerMinute = beatsPerSecond * 60;
        beatsPerMinute = Math.round(beatsPerMinute * 10) / 10;
    
        if (beatsPerMinute < 60 || beatsPerMinute > 200) {
            console.error('Ignoring crazy BPM: ', beatsPerMinute);
            return;
        }
    
        this.props.onBpmChange(beatsPerMinute);
    };

    onTap = () => {
        const { taps, tapTimeout } = this.state;
        const now = (new Date()).getTime();
        taps.push(now);
        if (taps.length === 4) {
            clearTimeout(tapTimeout);
            this.setState({
                taps: [],
                tapTimeout: null,
            });

            this.onHaveFourTaps(taps);
        } else {
            clearTimeout(tapTimeout);
            const newTapTimeout = setTimeout(this.onTapTimeout, 5000);
            this.setState({
                taps,
                tapTimeout: newTapTimeout,
            });
        }
    };

    onTapTimeout = () => {
        this.setState({
            taps: [],
            tapTimeout: null,
        });
    };

    render() {
        const { taps } = this.state;

        let message = 'Tap';
        if (taps.length > 0) {
            message = `Tap (${4 - taps.length} more ...)`;
        }
        return (
            <Button variant="secondary" onClick={this.onTap} className="w-100">{message}</Button>
        );
    }
}