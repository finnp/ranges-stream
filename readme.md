# ranges-stream
[![NPM](https://nodei.co/npm/ranges-stream.png)](https://nodei.co/npm/ranges-stream/)

Select multiple ranges from a readable stream

```js
var fs = require('fs')
var ranges = require('ranges-stream')

fs.createReadStream('text.txt')
  .pipe(ranges([{start: 10, end: 20}, {start: 30, end: 40}]))
  .pipe(createWriteStream('selected.txt')) // selects bytes from 10 to 20 and 30 to 40, discards the rest
```
