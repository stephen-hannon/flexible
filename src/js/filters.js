import dayjs from 'dayjs';

/**
 * @param {number} num - the currency amount, as a float
 * @returns {string} the amount, formatted with a dollar sign and rounded to two decimal places
 */
export const formatCurrency = num => `${ num < 0 ? '\u2212' : '' }$${ Math.abs(num).toFixed(2) }`;

/**
 * Formats a dollar amount, but degrading gracefully to `$-` if NaN is supplied
 * @param {number} num
 * @returns {string}
 */
export const formatCurrencySafe = num => (
	(typeof num === 'number' && !isNaN(num)) ? formatCurrency(num) : '$\u2014'
);

export const formatDate = date => dayjs(date).format('ddd, MMMM D, YYYY');
