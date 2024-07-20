const { Player } = require('discord-player');

const musicPlayer = new Player({
  ytdlOptions: {
    filter: 'audioonly',
    highWaterMark: 1 << 25,
  },
});

let currentQueue;

musicPlayer.on('error', (error) => {
  // Handle errors gracefully
  console.error('Music Player Error:', error);
  // You might want to send an error message to the Discord channel
});

musicPlayer.on('trackStart', (queue, track) => {
  // Track started playing
  console.log(`Now playing: ${track.title}`);
  // You might want to send a message to the Discord channel
});

musicPlayer.on('trackEnd', (queue, track) => {
  // Track ended
  console.log(`Track ended: ${track.title}`);
  // You might want to send a message to the Discord channel
});

musicPlayer.on('queueEnd', (queue) => {
  // Queue ended
  console.log(`Queue ended: ${queue.guild.name}`);
  // You might want to send a message to the Discord channel
});

const play = async (guildId, song) => {
  const queue = musicPlayer.createQueue(guildId);
  currentQueue = queue;

  try {
    if (!queue.playing) {
      await queue.connect(queue.connection);
    }
    await queue.play(song);
  } catch (error) {
    // Handle errors gracefully
    console.error('Music Player Play Error:', error);
  }
};

const pause = async (guildId) => {
  const queue = musicPlayer.getQueue(guildId);

  if (queue) {
    try {
      await queue.pause();
    } catch (error) {
      // Handle errors gracefully
      console.error('Music Player Pause Error:', error);
    }
  }
};

const resume = async (guildId) => {
  const queue = musicPlayer.getQueue(guildId);

  if (queue) {
    try {
      await queue.resume();
    } catch (error) {
      // Handle errors gracefully
      console.error('Music Player Resume Error:', error);
    }
  }
};

const skip = async (guildId) => {
  const queue = musicPlayer.getQueue(guildId);

  if (queue) {
    try {
      await queue.skip();
    } catch (error) {
      // Handle errors gracefully
      console.error('Music Player Skip Error:', error);
    }
  }
};

const previous = async (guildId) => {
  const queue = musicPlayer.getQueue(guildId);

  if (queue) {
    try {
      await queue.back();
    } catch (error) {
      // Handle errors gracefully
      console.error('Music Player Previous Error:', error);
    }
  }
};

const addToQueue = async (guildId, song) => {
  const queue = musicPlayer.createQueue(guildId);

  try {
    await queue.addTrack(song);
  } catch (error) {
    // Handle errors gracefully
    console.error('Music Player Add to Queue Error:', error);
  }
};

const removeFromQueue = async (guildId, track) => {
  const queue = musicPlayer.getQueue(guildId);

  if (queue) {
    try {
      await queue.remove(track);
    } catch (error) {
      // Handle errors gracefully
      console.error('Music Player Remove from Queue Error:', error);
    }
  }
};

const setVolume = async (guildId, volume) => {
  const queue = musicPlayer.getQueue(guildId);

  if (queue) {
    try {
      await queue.setVolume(volume);
    } catch (error) {
      // Handle errors gracefully
      console.error('Music Player Set Volume Error:', error);
    }
  }
};

const seekToTime = async (guildId, seconds) => {
  const queue = musicPlayer.getQueue(guildId);

  if (queue) {
    try {
      await queue.seek(seconds);
    } catch (error) {
      // Handle errors gracefully
      console.error('Music Player Seek Error:', error);
    }
  }
};

const getQueue = (guildId) => {
  return musicPlayer.getQueue(guildId);
};

module.exports = {
  play,
  pause,
  resume,
  skip,
  previous,
  addToQueue,
  removeFromQueue,
  setVolume,
  seekToTime,
  getQueue,
};