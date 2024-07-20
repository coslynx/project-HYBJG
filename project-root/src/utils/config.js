require('dotenv').config();

module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  // Add other configuration settings here
  prefix: '!', // Bot prefix for commands
  defaultVolume: 50, // Default volume for music playback
  maxVolume: 100, // Maximum volume limit
  maxQueueSize: 20, // Maximum number of songs allowed in the queue
  // Database configuration (if using a database)
  databaseUrl: process.env.DATABASE_URL,
  databaseType: process.env.DATABASE_TYPE,
  // Other settings
  // ...
};