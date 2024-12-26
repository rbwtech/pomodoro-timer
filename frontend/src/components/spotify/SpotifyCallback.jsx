import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const setupSpotify = async () => {
            const hash = window.location.hash;
            if (hash) {
                const params = new URLSearchParams(hash.substring(1));
                const access_token = params.get('access_token');

                if (access_token) {
                    localStorage.setItem('spotify_token', access_token);
                    
                    // Get available devices
                    try {
                        const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
                            headers: {
                                'Authorization': `Bearer ${access_token}`
                            }
                        });
                        const devices = await response.json();
                        
                        // If no active device, transfer playback to web player
                        if (devices.devices.length > 0) {
                            await fetch('https://api.spotify.com/v1/me/player', {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `Bearer ${access_token}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    device_ids: [devices.devices[0].id],
                                    play: false
                                })
                            });
                        }
                    } catch (error) {
                        console.error('Error setting up Spotify:', error);
                    }
                    
                    navigate('/timer');
                }
            } else {
                navigate('/login');
            }
        };

        setupSpotify();
    }, [navigate]);

    return <div>Connecting to Spotify...</div>;
};

export default SpotifyCallback;