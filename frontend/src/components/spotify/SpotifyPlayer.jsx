// src/components/spotify/SpotifyPlayer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { spotifyConfig } from '../../config/spotifyConfig';
import '../../styles/spotifyPlayer.css';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const SpotifyPlayer = ({ volume, onToggleSound }) => { // Accept onToggleSound as a prop
    const [isConnected, setIsConnected] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [soundEnabled, setSoundEnabled] = useState(true); // Local sound toggle
    const dropdownRef = useRef(null);
    const [playbackState, setPlaybackState] = useState({
        isPlaying: false,
        currentTrackUri: null,
    });

    useEffect(() => {
        if (player) {
            player.setVolume(soundEnabled ? volume : 0).catch((error) =>
                console.error('Failed to set volume:', error)
            );
        }
    }, [volume, soundEnabled, player]);

    useEffect(() => {
        const token = localStorage.getItem('spotify_token');
        if (!token) return;

        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;

        window.onSpotifyWebPlaybackSDKReady = () => {
            const playerInstance = new window.Spotify.Player({
                name: 'Waqtify Web Player',
                getOAuthToken: (cb) => cb(token),
                volume: volume,
            });

            playerInstance.addListener('ready', async ({ device_id }) => {
                setDeviceId(device_id);

                try {
                    await fetch('https://api.spotify.com/v1/me/player', {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            device_ids: [device_id],
                            play: false,
                        }),
                    });
                    setIsConnected(true);
                } catch (error) {
                    console.error('Error setting active device:', error);
                }
            });

            playerInstance.addListener('player_state_changed', (state) => {
                if (!state) return;

                setPlaybackState({
                    isPlaying: !state.paused,
                    currentTrackUri: state.track_window.current_track.uri,
                });
                setCurrentTrack(state.track_window.current_track);
            });

            playerInstance.connect();
            setPlayer(playerInstance);
        };

        document.body.appendChild(script);

        return () => {
            if (player) {
                player.disconnect();
            }
            document.body.removeChild(script);
        };
    }, []);

    const playPlaylist = async (playlistUri) => {
        try {
            const token = localStorage.getItem('spotify_token');
            if (!deviceId) throw new Error('No device ID available.');

            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ context_uri: playlistUri }),
            });
        } catch (error) {
            setError('Failed to play playlist.');
        }
    };

    const debouncedSetVolume = useCallback(
        debounce(async (volumeValue) => {
            if (player) {
                try {
                    await player.setVolume(volumeValue);
                } catch (error) {
                    console.error('Failed to set volume:', error);
                }
            }
        }, 300),
        [player]
    );

    useEffect(() => {
        if (soundEnabled) {
            debouncedSetVolume(volume);
        } else {
            debouncedSetVolume(0); 
        }
    }, [volume, soundEnabled, debouncedSetVolume]);

    const loadPlaylists = useCallback(async () => {
        const token = localStorage.getItem('spotify_token');
        if (!token || !deviceId) return;
        setIsLoading(true);

        try {
            const response = await fetch('https://api.spotify.com/v1/me/playlists', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to load playlists.');

            const data = await response.json();
            setPlaylists(data.items);
        } catch (error) {
            setError('Failed to load playlists.');
        } finally {
            setIsLoading(false);
        }
    }, [deviceId]);

    useEffect(() => {
        if (isConnected) {
            loadPlaylists();
        }
    }, [isConnected, loadPlaylists]);

    const searchTracks = async query => {
        try {
            const token = localStorage.getItem('spotify_token');
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!response.ok) throw new Error('Failed to search tracks.');

            const data = await response.json();
            return data.tracks.items;
        } catch (error) {
            setError('Failed to search tracks.');
            return [];
        }
    };

    const playTrack = async uri => {
        try {
            const token = localStorage.getItem('spotify_token');
            if (!deviceId) throw new Error('No device ID available.');

            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uris: [uri] }),
            });
            setPlaybackState({ isPlaying: true, currentTrackUri: uri });
        } catch (error) {
            setError('Failed to play track.');
        }
    };

    const pauseTrack = async () => {
        try {
            const token = localStorage.getItem('spotify_token');
            if (!deviceId) throw new Error('No device ID available.');

            await fetch('https://api.spotify.com/v1/me/player/pause', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
            });
            setPlaybackState(prev => ({ ...prev, isPlaying: false }));
        } catch (error) {
            setError('Failed to pause track.');
        }
    };

    const handleSearch = async e => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 2) {
            const tracks = await searchTracks(query);
            setSearchResults(tracks);
        } else {
            setSearchResults([]);
        }
    };

    const connectSpotify = () => {
        const { clientId, redirectUri, scopes } = spotifyConfig;
        const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${encodeURIComponent(scopes)}`;
        window.location.href = url;
    };

    const handleOutsideClick = e => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (player) {
            player.setVolume(volume).catch(error => console.error('Failed to set volume:', error));
        }
    }, [volume, player]);

    return (
        <div className="spotify-player">
            <h3>Music Player</h3>
            {!isConnected ? (
                <div className="spotify-connect-container">
                    <button className="spotify-connect-btn" onClick={connectSpotify}>
                        Connect with Spotify
                    </button>
                </div>
            ) : (
                <>
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                            <button onClick={() => setError(null)}>Dismiss</button>
                        </div>
                    )}
                    <div className="spotify-search" ref={dropdownRef}>
                        <input
                            type="text"
                            placeholder="Search songs..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="spotify-search-input"
                        />
                        {searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map(track => (
                                    <div key={track.id} className="track-item">
                                        <img
                                            src={
                                                track.album.images?.[2]?.url ||
                                                track.album.images?.[0]?.url ||
                                                'https://via.placeholder.com/40'
                                            }
                                            alt={track.name}
                                            className="track-thumbnail"
                                        />
                                        <div className="track-info">
                                            <p className="track-name">{track.name}</p>
                                            <p className="track-artist">
                                                {track.artists?.[0]?.name || 'Unknown Artist'}
                                            </p>
                                        </div>
                                        <button
                                            className="play-pause-btn"
                                            onClick={() =>
                                                playbackState.isPlaying &&
                                                playbackState.currentTrackUri === track.uri
                                                    ? pauseTrack()
                                                    : playTrack(track.uri)
                                            }
                                        >
                                            {playbackState.isPlaying &&
                                            playbackState.currentTrackUri === track.uri
                                                ? '⏸️ Pause'
                                                : '▶️ Play'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {currentTrack && (
                        <div className="now-playing">
                            <h4>Now Playing</h4>
                            <div className="now-playing-info">
                                <p>{currentTrack.name} - {currentTrack.artists?.[0]?.name}</p>
                                <button
                                    className="play-pause-btn"
                                    onClick={() =>
                                        playbackState.isPlaying
                                            ? pauseTrack()
                                            : playTrack(playbackState.currentTrackUri)
                                    }
                                >
                                    {playbackState.isPlaying ? '⏸️ Pause' : '▶️ Play'}
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="playlists-section">
                        <h3>Your Playlists</h3>
                        {isLoading ? (
                            <p>Loading playlists...</p>
                        ) : (
                            <div className="playlists-grid">
                                {playlists.map(playlist => (
                                    <div key={playlist.id} className="playlist-card">
                                        {playlist.images?.[0]?.url ? (
                                            <img
                                                src={playlist.images[0].url}
                                                alt={playlist.name}
                                                className="playlist-image"
                                            />
                                        ) : (
                                            <div className="playlist-placeholder">No Image</div>
                                        )}
                                        <div className="playlist-info">
                                            <h4>{playlist.name}</h4>
                                            <button
                                                className="play-btn"
                                                onClick={() => playPlaylist(playlist.uri)}
                                            >
                                                Play
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SpotifyPlayer;
