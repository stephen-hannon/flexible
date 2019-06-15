import * as utils from '../src/utils';

describe('utils.js', () => {
	describe('addCurrency', () => {
		it('adds 0.1 and 0.2', () => {
			expect(utils.addCurrency(0.1, 0.2)).toBe(0.3);
		});

		it('adds 0.01 and 0.05', () => {
			expect(utils.addCurrency(0.01, 0.05)).toBe(0.06);
		});
	});

	describe('findSemester', () => {
		it('returns', () => {
			expect(utils.findSemester(Date.now())).toBeDefined();
		});
	});
});
