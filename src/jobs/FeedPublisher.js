const { buildFeed } = require('../services/FeedService.js');

function publishFeed(items) {
  return JSON.stringify(buildFeed(items));
}

module.exports = { publishFeed };
