const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const config = require('config');

const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl, urlCode } = req.body;
  const baseUrl = config.get('baseUrl');

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ urlCode });

      if (url) {
        res.status(401).json('URL is taken');
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;