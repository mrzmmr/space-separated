# space-separated

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
