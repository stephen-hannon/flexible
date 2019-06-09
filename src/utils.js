import dayjs from 'dayjs';

/**
 * Adds two numbers that avoids floating-point errors like `.1 + .2 !== .3`
 * @param {number} x
 * @param {number} y
 * @returns {number} `x + y`, with two digits of precision
 */
export const addCurrency = (x, y) => Math.round(x * 100 + y * 100) / 100;

/**
 * @param {number} num - the currency amount, as a float
 * @returns {string} the amount, formatted with a dollar sign and rounded to two decimal places
 */
export const formatCurrency = num => `${ num < 0 ? '\u2212' : '' }$${ Math.abs(num).toFixed(2) }`;

/** temporary */
export const formatCurrencyOutput = num => (typeof num === 'number') ? formatCurrency(num) : '$\u2014';

export const formatDate = date => dayjs(date).format('ddd, MMMM D, YYYY');

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const softSemesterLimit = 1000 * 60 * 60 * 24 * 7; // 1 week

export default {
	addCurrency,
	formatCurrency,
	formatCurrencyOutput,
	formatDate,
	MS_PER_DAY,
	softSemesterLimit,
};
