import React from 'react';
import { spotifyConfig } from '../config/spotifyConfig';

const SpotifyLogin = () => {
    const connectSpotify = () => {
        const { clientId, redirectUri, scopes } = spotifyConfig;
        const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
        window.location.href = url;
    };

    return (
        <div className="spotify-login">
            <button onClick={connectSpotify} className="spotify-connect-btn">
                Connect with Spotify
            </button>
        </div>
    );
};

export default SpotifyLogin;