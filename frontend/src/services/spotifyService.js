import { spotifyConfig } from '../config/spotifyConfig';

class SpotifyService {
    constructor() {
        this.token = localStorage.getItem('spotify_token');
        this.refreshTokenValue = localStorage.getItem('spotify_refresh_token');
        this.isConnected = false; // Cache connection status
    }

    async fetchSpotifyAPI(endpoint, options = {}) {
        if (!this.token) throw new Error('Not authenticated');

        const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                ...options.headers
            }
        });

        if (!response.ok) {
            if (response.status === 401 && this.refreshTokenValue) {
                const newToken = await this.refreshToken();
                if (newToken) {
                    this.token = newToken;
                    localStorage.setItem('spotify_token', newToken);
                    return this.fetchSpotifyAPI(endpoint, options); // Retry the request
                }
            }
            throw new Error(`Spotify API error: ${response.status}`);
        }

        return response.json();
    }

    async checkConnection() {
        if (this.isConnected) return true;

        try {
            const playerState = await this.fetchSpotifyAPI('/me/player');
            this.isConnected = !!playerState.device; // Set to true if a device is connected
            return this.isConnected;
        } catch (error) {
            console.error('Error checking Spotify connection:', error);
            this.isConnected = false;
            return false;
        }
    }

    async getUserPlaylists() {
        return this.fetchSpotifyAPI('/me/playlists');
    }

    async playPlaylist(playlistId) {
        const isConnected = await this.checkConnection();
        if (!isConnected) {
            throw new Error('No connected device found. Please connect a device in Spotify.');
        }
        return this.fetchSpotifyAPI('/me/player/play', {
            method: 'PUT',
            body: JSON.stringify({
                context_uri: `spotify:playlist:${playlistId}`
            })
        });
    }

    async pausePlayback() {
        const isConnected = await this.checkConnection();
        if (!isConnected) {
            throw new Error('No connected device found. Please connect a device in Spotify.');
        }
        return this.fetchSpotifyAPI('/me/player/pause', {
            method: 'PUT'
        });
    }

    async refreshToken() {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${btoa(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`)}`
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshTokenValue
                })
            });

            const data = await response.json();
            if (data.access_token) {
                console.log('Spotify access token refreshed.');
                return data.access_token;
            } else {
                console.error('Failed to refresh Spotify token:', data);
                this.logout();
                return null;
            }
        } catch (error) {
            console.error('Error refreshing Spotify token:', error);
            return null;
        }
    }

    logout() {
        localStorage.removeItem('spotify_token');
        localStorage.removeItem('spotify_refresh_token');
        this.isConnected = false;
    }
}

export const spotifyService = new SpotifyService();
