const express = require('express');

const compressText = require('./compressText')

const decompressText = require('./decompressText')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'LZW compression API',
  });
});

router.use('/compressText', compressText)
router.use('/decompressText', decompressText)


module.exports = router;
