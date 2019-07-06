import * as filters from '../src/filters';

describe('filters.js', () => {
	describe('formatCurrency', () => {
		it('formats positive currency', () => {
			expect(filters.formatCurrency(0)).toBe('$0.00');
		});
		it('formats negative currency', () => {
			expect(filters.formatCurrency(-1.23)).toBe('\u2212$1.23');
		});
	});

	describe('formatCurrencySafe', () => {
		it('formats undefined', () => {
			expect(filters.formatCurrencySafe(undefined)).toBe('$\u2014');
		});
	});

	describe('formatDate', () => {
		it('formats a date', () => {
			expect(filters.formatDate(new Date(2019, 5, 15)))
				.toBe('Sat, June 15, 2019');
		});
	});
});
