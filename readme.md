# space-separated

[![Build Status](https://travis-ci.org/mrzmmr/space-separated.svg?branch=master)](https://travis-ci.org/mrzmmr/space-separated)
[![Coverage Status](https://coveralls.io/repos/github/mrzmmr/space-separated/badge.svg?branch=master)](https://coveralls.io/github/mrzmmr/space-separated?branch=master)

Splits a string by whitespace. 
## Install

```bash
npm i -S space-separated
```

## Usage

```js
const sep = require('space-separated')

sep('  one "and two and"\n\'three and\'\t`four`  ')
```

*outputs*

```js
['one', '"and two and"', '\'three and\'', '`four`']
```

## License

MIT © Paul Zimmer
