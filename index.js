var through = require('through2')

module.exports = rangesStream

function rangesStream (ranges) {
  var pos = 0
  var currentRange = ranges.shift()
  return through(function processChunk (chunk, enc, cb) {
    if (!(currentRange)) return cb()
    var bufEnd = currentRange.end - pos
    if (pos <= currentRange.start) {
      if (pos + chunk.length > currentRange.start) {
        var bufStart = currentRange.start - pos
        if (currentRange.end <= pos + chunk.length) {
          this.push(chunk.slice(bufStart, bufEnd))
          currentRange = ranges.shift() // next Range
          pos += bufEnd
          return processChunk.bind(this)(chunk.slice(bufEnd), enc, cb)
        } else {
          // the range continues to the next chunk
          this.push(chunk.slice(bufStart))
        }
      }
    } else {
      if (currentRange.end <= pos + chunk.length) {
        this.push(chunk.slice(0, bufEnd))
        // there could be more
        pos += bufEnd
        currentRange = ranges.shift()
        return processChunk.bind(this)(chunk.slice(bufEnd), enc, cb)
      } else {
        this.push(chunk)
      }
    }
    pos += chunk.length
    cb()
  })
}
