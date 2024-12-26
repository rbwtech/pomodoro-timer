import { Route } from 'react-router-dom';
import SpotifyCallback from '../components/spotify/SpotifyCallback';

export const spotifyRoutes = <Route path="/callback" element={<SpotifyCallback />} />;