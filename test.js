const split = require('.');

describe('space-separated', () => {
	test('should return empty array.', () => (
		expect(split('')).toEqual([])
	));

	test('should split with single chars.', () => (
		expect(split('a b')).toEqual(['a', 'b'])
	));

	test('should only return non whitespace values.', () => (
		expect(split('    \n\n\t')).toEqual([])
	));

	test('should return value.', () => (
		expect(split('  beep\tboop\n'))
			.toEqual(['beep', 'boop'])
	));

	test('should be string sensitive.', () => (
		expect(split('   "beep"\t"boop bop"\n'))
			.toEqual(['"beep"', '"boop bop"'])
	));

	test('should return value.', () => (
		expect(split('boop'))
			.toEqual(['boop'])
	));

	test('should throw unterminated string.', () => (
		expect(() => split(' "bop'))
			.toThrow(/Unterminated string./)
	));

	test('should throw with non string argument.', () => (
		expect(() => split({}))
			.toThrow(/Expected string but got object./)
	));
});
