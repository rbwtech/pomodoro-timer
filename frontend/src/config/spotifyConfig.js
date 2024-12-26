export const spotifyConfig = {
    clientId: 'b69f5d0ebcb14e5d8c937c6f5916249d',
    clientSecret: '0fd4038450cb49fc866dfbf861a6c23f',
    redirectUri: 'http://localhost:5173/callback',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    scopes: [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-read-playback-state',
        'user-modify-playback-state',
        'playlist-read-private',
        'app-remote-control'
    ].join(' ')
};