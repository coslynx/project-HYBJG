const fetch = require('node-fetch');
const SpotifyWebApi = require('spotify-web-api-node');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../config');

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

async function searchSpotify(query) {
  try {
    const data = await spotifyApi.searchTracks(query);
    return data.body.tracks.items;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return [];
  }
}

async function getSpotifyTrack(trackId) {
  try {
    const data = await spotifyApi.getTrack(trackId);
    return data.body;
  } catch (error) {
    console.error('Error getting Spotify track:', error);
    return null;
  }
}

async function playSpotifyTrack(trackId, voiceConnection) {
  try {
    const track = await getSpotifyTrack(trackId);
    const url = track.external_urls.spotify;

    if (voiceConnection) {
      voiceConnection.play(url);
      return track;
    } else {
      throw new Error('Not connected to a voice channel!');
    }
  } catch (error) {
    console.error('Error playing Spotify track:', error);
    return null;
  }
}

module.exports = {
  searchSpotify,
  getSpotifyTrack,
  playSpotifyTrack,
};