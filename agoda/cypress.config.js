const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.AGODA_URL,

    video: true,
    screenshotOnRunFailure: true
  },

  expose: {
    AGODA_URL: process.env.AGODA_URL,
    AMAZON_URL: process.env.AMAZON_URL,
    YOUTUBE_URL: process.env.YOUTUBE_URL
  },

  viewportWidth: 1280,
  viewportHeight: 720
})