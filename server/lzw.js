const LAST_ASCII_IDX = 255

function asciiToCharDict() {
    dict = {}
    for (let i = 0; i <= LAST_ASCII_IDX ; i++) {
        dict[i] = String.fromCharCode(i)
    }
    return dict
}

function charToAsciiDict() {
    dict = {}
    for (let i = 0; i <= LAST_ASCII_IDX ; i++) {
        dict[String.fromCharCode(i)] = i
    }
    return dict
}

function compress(text) {
    const dict = charToAsciiDict()
    let last = LAST_ASCII_IDX 
    let currentSubstr = ""
    const result = []
    
    let i = 0, j = 1
    while (j <= text.length) {
        currentSubstr = text.substring(i, j)

        // Substring in dictionary
        if (dict[currentSubstr] !== undefined) {
            if (j == text.length) {
                result.push(dict[currentSubstr])
            }
            j++
        }
        // Substring not in dictionary
        else {
            dict[currentSubstr] = ++last
            result.push(dict[text.substring(i, j - 1)])
            i = j - 1
        }
    }

    return result
}

function decompress(asciiCodesInDecimal) {
    const dict = asciiToCharDict()
    let last = LAST_ASCII_IDX 
    const result = []
    let currentCode = asciiCodesInDecimal[0]
    let str = dict[currentCode]
    result.push(str)

    let i = 1
    while (i < asciiCodesInDecimal.length) {
        currentCode = asciiCodesInDecimal[i]
        let entry = ""

        // current code not in dictionary
        if (dict[currentCode] == undefined) {
            entry = str.concat(str[0])
        }
        // current code in dictionary
        else {
            entry = dict[currentCode]
        }
        result.push(entry)
        dict[++last] = str.concat(entry[0])
        str = entry
        i++
    }

    return result.join('')
}

module.exports = {compress, decompress}

// const result = compress("semakin panjang tidak semakin rusak ya plis")
// console.log(result, decompress(result))

