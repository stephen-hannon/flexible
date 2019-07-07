import * as parse from '../src/js/parse';

describe('parse.js', () => {
	describe('parseData', () => {
		it('returns an empty array on invalid data', () => {
			[
				'',
			].forEach(row => {
				expect(parse.parseData(row)).toHaveProperty('parsedRawData', []);
			});
		});

		// TODO: more tests
	});

	describe('parseDataRow', () => {
		it('returns null on an invalid row', () => {
			[
				'',
				'Gold 14\tMay 11, 2018 9:16AM\tSDH West2\t- $1.00',
			].forEach(row => {
				expect(parse.parseDataRow(row)).toBeNull();
			});
		});
		it('parses a row with Flex Points', () => {
			expect(parse.parseDataRow('Flex Points\tMay 10, 2018 9:10AM\tSubway 1\t- $5.49'))
				.toEqual({
					date: new Date(2018, 4, 10, 9, 10).valueOf(),
					amountChange: -5.49,
				});
		});
		it('handles positive balances', () => {
			expect(parse.parseDataRow('Flex Points\tMay 10, 2018 9:10AM\tSubway 1\t+ $5.49'))
				.toHaveProperty('amountChange', 5.49);
		});
	});
});
