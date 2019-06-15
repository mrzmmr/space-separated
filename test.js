const {test} = require('tap');
const split = require('.');

test('space-separated', t => {
	t.same(
		split(''),
		[],
		'should return empty array.'
	);

	t.same(
		split('    \n\n\t'),
		[],
		'should only return non whitespace values.'
	);

	t.same(
		split('  beep\tboop\n'),
		['beep', 'boop'],
		'should return value.'
	);

	t.same(
		split('   "beep"\t"boop bop"\n'),
		['"beep"', '"boop bop"'],
		'should be string sensitive.'
	);

	t.same(
		split('boop'),
		['boop'],
		'should return value.'
	);

	t.throws(() => {
		split(' "bop');
	},
	/Unterminated string/,
	'should throw unterminated string.'
	);

	t.throws(() => {
		split({});
	},
	/Expected string but got object./,
	'should throw with non string argument.'
	);

	t.end();
});
