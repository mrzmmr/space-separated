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

	const isWhitespace = value =>
		/\s|\t|\n/.test(value);

	const whitespace = () =>
		isWhitespace(peek()) ?
			whitespace(next()) :
			undefined;

	const string = () => {
		const here = peek();

		if (here !== '"' && here !== '\'' && here !== '`') {
			return;
		}

		let res = next(2);

		while (peek(-1) !== here) {
			if (eof()) {
				throw new Error('Unterminated string.');
			}

			res += next();
		}

		return [res];
	};

	const nonWhitespace = () => {
		let res = '';

		while (!isWhitespace(peek()) && !eof()) {
			const value = string();

			if (value) {
				res += value;
			} else {
				res += next();
			}
		}

		return [res];
	};

	const sep = (...methods) => v => {
		value = v;

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

		return res;
	};

	return sep(whitespace, nonWhitespace)(value)
		.filter(c => c.trim().length > 1);
};
