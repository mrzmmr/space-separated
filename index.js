'use strict';

module.exports = value => {
	let cursor = 0;

	if (typeof value !== 'string') {
		throw new TypeError(`Expected string but got ${
			typeof value
		}.`);
	}

	const eof = () =>
		cursor === value.length;

	const peek = (a = 1) =>
		value.substring(cursor, cursor + a);

	const next = (a = 1) =>
		peek(a).split('').map(c => {
			cursor++;
			return c;
		}).join('');

	const IS_WHITESPACE = /\s|\n|\t/;

	const whitespace = () =>
		IS_WHITESPACE.test(peek()) ?
			whitespace(next()) :
			undefined;

	const IS_QUOTE = /"|'|`/;

	const string = () => {
		if (!IS_QUOTE.test(peek())) {
			return;
		}

		let closed = false;
		let val = next();
		const q = val;

		while (!eof()) {
			val += peek();

			if (next() === q) {
				closed = true;
				break;
			}
		}

		if (!closed) {
			throw new Error('Unterminated string.');
		}

		return [val];
	};

	const nonWhitespace = () => {
		let res = '';

		while (!IS_WHITESPACE.test(peek()) && !eof()) {
			const value = string();

			if (value) {
				res += value;
			} else {
				res += next();
			}
		}

		return [res];
	};

	const methods = [whitespace, nonWhitespace];
	let res = [];

	while (!eof()) {
		let r;

		for (const method of methods) {
			r = method();

			if (r) {
				res = res.concat(r);
				break;
			}
		}
	}

	return res.filter(c => c.length > 0);
};
