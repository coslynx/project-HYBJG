const { default: axios } = require('axios');
const ytdl = require('ytdl-core');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Searches YouTube for videos matching the given query.
 *
 * @param {string} query - The search query.
 * @returns {Promise<Array<Object>>} - An array of video objects matching the query.
 */
async function searchYoutube(query) {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
      },
    });

    return response.data.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw new Error('Failed to search YouTube');
  }
}

/**
 * Retrieves video information from YouTube.
 *
 * @param {string} videoId - The YouTube video ID.
 * @returns {Promise<Object>} - An object containing video information.
 */
async function getYoutubeVideoInfo(videoId) {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet,contentDetails',
        id: videoId,
      },
    });

    return {
      title: response.data.items[0].snippet.title,
      duration: response.data.items[0].contentDetails.duration,
      thumbnail: response.data.items[0].snippet.thumbnails.default.url,
    };
  } catch (error) {
    console.error('Error retrieving video information:', error);
    throw new Error('Failed to retrieve video information');
  }
}

/**
 * Downloads audio from a YouTube video.
 *
 * @param {string} videoUrl - The URL of the YouTube video.
 * @returns {Promise<Object>} - An object containing the audio stream and video information.
 */
async function downloadYoutubeAudio(videoUrl) {
  try {
    const videoInfo = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.filterFormats(videoInfo.formats, 'audioonly')[0];
    const stream = ytdl(videoUrl, { filter: 'audioonly', quality: audioFormat.itag });

    return {
      stream,
      title: videoInfo.videoDetails.title,
      duration: videoInfo.videoDetails.lengthSeconds,
      thumbnail: videoInfo.videoDetails.thumbnail.thumbnails[0].url,
    };
  } catch (error) {
    console.error('Error downloading YouTube audio:', error);
    throw new Error('Failed to download YouTube audio');
  }
}

module.exports = {
  searchYoutube,
  getYoutubeVideoInfo,
  downloadYoutubeAudio,
};