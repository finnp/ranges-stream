var through = require('through2')

module.exports = rangesStream

function rangesStream (ranges) {
  var pos = 0
  var currentRange = ranges.shift()
  return through(function processChunk (chunk, enc, cb) {
    if (!(currentRange)) return cb()

    if (pos + chunk.length > currentRange.start) {
      var bufStart = Math.max(currentRange.start - pos, 0)
      var bufEnd = currentRange.end - pos
      if (currentRange.end <= pos + chunk.length) {
        this.push(chunk.slice(bufStart, bufEnd))
        currentRange = ranges.shift() // next Range
        pos += bufEnd
        return processChunk.bind(this)(chunk.slice(bufEnd), enc, cb)
      } else {
        // the range continues to the next chunk
        this.push(bufStart > 0 ? chunk.slice(bufStart) : chunk)
      }
    }

    pos += chunk.length
    cb()
  })
}
