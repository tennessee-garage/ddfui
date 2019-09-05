import React from 'react';

const millisToSeconds = (millis) => {
    return Math.round(Number.parseInt(millis, 10) / 1000);
}

export default function Playlist({ playlist }) {
    if (!playlist) {
        return null;
    }

    const items = playlist.queue || [];
    const playlistItems = items.map((item, idx) => {
        const isActive = idx === playlist.current_position;
        const className = isActive ? "list-group-item active" : "list-group-item";
        const secondsRemaining = millisToSeconds(playlist.millis_remaining);
        const timeRemaining = isActive && playlist.millis_remaining ?
            `(${secondsRemaining}s remaining)` : '';
        const itemName = `${item.name} ${timeRemaining}`;
        return (<ul key={idx} className={className}>{itemName}</ul>);
    });

    return (
        <div className="card card-body bg-light">
            <ul className="list-group">
                {playlistItems}
            </ul>
        </div>
    );
};