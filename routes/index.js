const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const config = require('config');

const Url = require('../models/Url');

// @route     GET /
// @desc      Render home page
function renderHome(req, res) {
  res.render('index', {
    shortUrl: req.shortUrl,
    errMessage: req.errMessage
  });
}
router.get('/', renderHome)

// @route     POST /shorten
// @desc      Create short URL
async function createShortUrl(req, res, next) {
  const { longUrl, urlCode } = req.body;
  const baseUrl = config.get('baseUrl');

  req.errMessage = '';
  req.shortUrl = '';

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    req.errMessage = 'Invalid base url';
    next();
  }

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ urlCode });

      if (url) {  
        req.errMessage = 'URL is taken';
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        req.shortUrl = shortUrl;
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    req.errMessage = 'Invalid long url';
    next();
  }
}
router.post('/', createShortUrl, renderHome);

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;