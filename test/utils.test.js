import * as utils from '../src/utils';

describe('utils.js', () => {
	describe('addCurrency', () => {
		it('adds 0.1 and 0.2', () => {
			expect(utils.addCurrency(0.1, 0.2)).toBe(0.3);
		});
		it('adds 0.01 and 0.05', () => {
			expect(utils.addCurrency(0.01, 0.05)).toBe(0.06);
		});
		it('adds 0.3 and -0.2', () => {
			expect(utils.addCurrency(0.3, -0.2)).toBe(0.1);
		});
	});

	describe('getSemesterStart', () => {
		[
			['Fall', 2018, 7, 19],
			['Fall', 2019, 7, 25],
			['Spring', 2022, 0, 9],
			['Spring', 2023, 0, 15],
		].forEach(semester => {
			const [season, year, month, date] = semester;
			it(`finds start of ${season} ${year}`, () => {
				expect(utils.getSemesterStart(year, season).valueOf())
					.toBe(new Date(year, month, date).valueOf());
			});
		});
	});

	describe('getSemesterEnd', () => {
		[
			['Fall', 2018, 11, 15],
			['Fall', 2019, 11, 21],
			['Spring', 2022, 4, 7],
			['Spring', 2023, 4, 13],
		].forEach(semester => {
			const [season, year, month, date] = semester;
			it(`finds end of ${season} ${year}`, () => {
				expect(utils.getSemesterEnd(year, season).valueOf())
					.toBe(new Date(year, month, date).valueOf());
			});
		});
	});

	describe('findSemester', () => {
		it('finds semester of September 1, 2019, with all properties', () => {
			expect(utils.findSemester(new Date(2019, 8, 1)))
				.toEqual({
					year: 2019.2,
					name: 'Fall 2019',
					start: new Date(2019, 7, 25).valueOf(),
					end: new Date(2019, 11, 21).valueOf()
				});
		});

		it('finds semester of May 1, 2019', () => {
			expect(utils.findSemester(new Date(2019, 4, 1)))
				.toHaveProperty('name', 'Spring 2019');
		});

		it('finds semester of December 31, 2019', () => {
			expect(utils.findSemester(new Date(2019, 11, 31)))
				.toHaveProperty('name', 'Spring 2020');
		});
	});

	describe('formatCurrency', () => {
		it('formats positive currency', () => {
			expect(utils.formatCurrency(0)).toBe('$0.00');
		});
		it('formats negative currency', () => {
			expect(utils.formatCurrency(-1.23)).toBe('\u2212$1.23');
		});
	});

	describe('formatDate', () => {
		it('formats a date', () => {
			expect(utils.formatDate(new Date(2019, 5, 15)))
				.toBe('Sat, June 15, 2019');
		});
	});

	describe('parseDataRow', () => {
		it('returns null on an invalid row', () => {
			[
				'',
				'Gold 14\tMay 11, 2018 9:16AM\tSDH West2\t- $1.00',
			].forEach(row => {
				expect(utils.parseDataRow(row)).toBeNull();
			});
		});
		it('parses a row with Flex Points', () => {
			expect(utils.parseDataRow('Flex Points\tMay 10, 2018 9:10AM\tSubway 1\t- $5.49'))
				.toEqual({
					date: new Date(2018, 4, 10, 9, 10).valueOf(),
					amountChange: -5.49,
				});
		});
		it('handles positive balances', () => {
			expect(utils.parseDataRow('Flex Points\tMay 10, 2018 9:10AM\tSubway 1\t+ $5.49'))
				.toHaveProperty('amountChange', 5.49);
		});
	});
});
