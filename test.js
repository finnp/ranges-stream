var test = require('tape')
var concat = require('concat-stream')
var ranges = require('./')

test('nicely splitted ranges', function (t) {
  t.plan(1)
  var test = ranges([{start: 5, end: 10}, {start: 12, end: 14}])
  test.pipe(concat(function (result) {
    t.equal(result.toString(), '5555522')
  }))
  test.write('xxxxx')
  test.write('55555')
  test.write('xx')
  test.write('22')
  test.write('xx')
  test.end()
})

test('randomly splitted ranges', function (t) {
  t.plan(1)
  var test = ranges([{start: 5, end: 10}, {start: 12, end: 14}])
  test.pipe(concat(function (result) {
    t.equal(result.toString(), '5555522')
  }))
  test.write('xxxxx555')
  test.write('5')
  test.write('5xx22xx')
  test.end()
})

test('randomly splitted ranges 2', function (t) {
  t.plan(1)
  var test = ranges([{start: 5, end: 10}, {start: 12, end: 14}])
  test.pipe(concat(function (result) {
    t.equal(result.toString(), '5555522')
  }))
  test.write('xxx')
  test.write('xx55555x')
  test.write('x2')
  test.write('2xx')
  test.end()
})

test('character writes', function (t) {
  t.plan(1)
  var test = ranges([{start: 5, end: 10}, {start: 12, end: 14}])
  test.pipe(concat(function (result) {
    t.equal(result.toString(), '5555522')
  }))
  'xxxxx55555xx22xx'.split('').forEach(function (c) {
    test.write(c)
  })
  test.end()
})

test('all at once', function (t) {
  t.plan(1)
  var test = ranges([{start: 5, end: 10}, {start: 12, end: 14}])
  test.pipe(concat(function (result) {
    t.equal(result.toString(), '5555522')
  }))
  test.write('xxxxx55555xx22xx')
  test.end()
})

test('full range', function (t) {
  t.plan(1)
  var test = ranges([{start: 0, end: 14}])
  test.pipe(concat(function (result) {
    t.equal(result.toString(), 'xxxxx55555xx22')
  }))
  test.write('xxxxx5')
  test.write('5555x')
  test.write('x22')
  test.end()
})

test('no range', function (t) {
  t.plan(1)
  var test = ranges([])
  test.pipe(concat(function (result) {
    t.equal(result.toString(), '')
  }))
  test.write('xxxxx5')
  test.write('5555x')
  test.write('x22')
  test.end()
})
