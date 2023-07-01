const express = require('express')
const lzw = require('./lzw.js')
const util = require('./util.js')


const app = express()
app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.send("<h1>Request successful</h1>")
})

app.post("/compressText", (req, res) => {
  const compressedInDecimal = lzw.compress(req.body.text)
  const compressedInBinary = util.decToBin(compressedInDecimal)
  res.json({result: compressedInBinary.join(' '), success: true, errorMsg: ''});
});

app.post("/decompressText", (req, res) => {
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

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
