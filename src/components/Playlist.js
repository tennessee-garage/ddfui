import React from 'react';

const millisToSeconds = (millis) => {
    return Math.round(Number.parseInt(millis, 10) / 1000);
}

const STYLE = {
    maxHeight: 200,
    overflow: 'scroll',
    marginBottom: 16,
}

export default function Playlist({ playlist }) {
    if (!playlist) {
        return null;
    }

    const currentPosition = playlist.current_position;
    const items = playlist.queue || [];
    const playlistItems = items.map((item, idx) => {
        const isActive = idx === currentPosition;
        const className = isActive ? "list-group-item active" : "list-group-item";
        const secondsRemaining = millisToSeconds(playlist.millis_remaining);
        const timeRemaining = isActive && playlist.millis_remaining ?
            `(${secondsRemaining}s remaining)` : '';
        const itemName = `${item.name} ${timeRemaining}`;
        return (<ul key={idx} className={className}>{itemName}</ul>);
    });

    const sortedItems = [
        ...playlistItems.slice(currentPosition, playlistItems.length),
        ...playlistItems.slice(0, currentPosition),
    ];

    return (
        <>
            <div className="card card-body bg-light" style={STYLE}>
                <ul className="list-group">
                    {sortedItems}
                </ul>
            </div>
        </>
    );
};