function tokenize(input) {
    return input.match(/\S+/g)
}

function binToDec(inputs) {
    // inputs: array of binary string
    const results = []
    inputs.forEach(e => {
        results.push(parseInt(e, 2))
    })
    return results
}

function decToBin(inputs) {
    // inputs: array of int
    const results = []
    inputs.forEach(e => {
        results.push(e.toString(2))
    })
    return results
}

function validateBinary(str) {
    for (char of str) {
        if (char !== '0' && char !== '1' && char !==' ') {
            return false
        }
    }
    return true
}

module.exports = {tokenize, binToDec, decToBin, validateBinary}

// console.log(binToDec(decToBin([3, 4, 5, 77, 192, 0, 8])))
