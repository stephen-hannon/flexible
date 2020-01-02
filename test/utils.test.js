import * as utils from '../src/js/utils';

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

	describe('adjustBalances', () => {
		it('adds 2', () => {
			const input = [
				[1, 0],
				[2, -1],
			];
			const output = [
				[1, 2],
				[2, 1],
			];
			expect(utils.adjustBalances(input, 2)).toEqual(output);
		});
	});

	describe('getSemesterStart', () => {
		[
			['Fall', 2018, 7, 19],
			['Fall', 2019, 7, 25],
			['Spring', 2022, 0, 9],
			['Spring', 2023, 0, 15],
		].forEach(([season, year, month, date]) => {
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
		].forEach(([season, year, month, date]) => {
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
					id: 2019.2,
					name: 'Fall 2019',
					start: new Date(2019, 7, 25).valueOf(),
					end: new Date(2019, 11, 21).valueOf(),
				});
		});

		it('finds semester of May 1, 2019', () => {
			expect(utils.findSemester(new Date(2019, 4, 1)))
				.toHaveProperty('name', 'Spring 2019');
		});

		it('finds semester of December 31, 2023', () => {
			expect(utils.findSemester(new Date(2023, 11, 31)))
				.toHaveProperty('name', 'Spring 2024');
		});

		it('finds semester, with manual dates', () => {
			const insideSoftLimit = utils.softSemesterLimit / utils.MS_PER_DAY - 1;
			const date = new Date(2019, 4, 11 + insideSoftLimit, 12);

			expect(utils.findSemester(date))
				.toHaveProperty('name', 'Spring 2019');

			expect(utils.findSemester(
				date,
				{
					start: {},
					end: { '2019.1': -1 },
				}
			)).toHaveProperty('name', 'Fall 2019');
		});
	});

	describe('interpolate', () => {
		it('interpolates, taking DST into account', () => {
			const [date1, date2, date3] = [9, 10, 11].map(date => new Date(2019, 2, date).valueOf());

			expect(utils.interpolate(date1, date3))
				.toEqual([date1, date2, date3]);
			expect(utils.interpolate(date1 - 1, date3 + 1))
				.toEqual([date1 - 1, date1, date2, date3, date3 + 1]);
		});
		it('interpolates the same point', () => {
			expect(utils.interpolate(1, 1))
				.toEqual([1, 1]);
		});
	});

	describe('interpolatePoint', () => {
		it('interpolates a point', () => {
			expect(utils.interpolatePoint(2, 1, 4, 0, 6)).toBe(2);
			expect(utils.interpolatePoint(2, 0, 1, 0, 1)).toBe(1);
			expect(utils.interpolatePoint(-1, 0, 1, 0, 1)).toBe(0);
		});
	});
});
