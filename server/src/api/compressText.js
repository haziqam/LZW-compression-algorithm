const express = require('express');

const router = express.Router();

const lzw = require('../lib/lzw')
const util = require('../lib/util')

router.post('/', (req, res) => {
    const compressedInDecimal = lzw.compress(req.body.text)
    const compressedInBinary = util.decToBin(compressedInDecimal)
    res.json({result: compressedInBinary.join(' '), success: true, errorMsg: ''});
})

module.exports = router;