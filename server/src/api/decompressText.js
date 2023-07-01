const express = require('express');

const router = express.Router();

const lzw = require('../lib/lzw')
const util = require('../lib/util')

router.post('/', (req, res) => {
    if (!util.validateBinary(req.body.text)) {
        res.json({result: '', success: false, errorMsg: 'Invalid binary string'})
    }
    else {
        const tokenizedTextInBinary = util.tokenize(req.body.text)
        const tokenizedTextInDecimal = util.binToDec(tokenizedTextInBinary)
        const decompressedText = lzw.decompress(tokenizedTextInDecimal)
        res.json({result: decompressedText, success: true, errorMsg: ''})
    }
})

module.exports = router;