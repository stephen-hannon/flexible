import dayjs from 'dayjs';

/**
 * @typedef {Object} semester
 * @property {number} year - year plus 0.1 if spring, 0.2 if fall
 * @property {string} name - human-readable name: `[Spring|Fall] <year>`
 * @property {number} start - start date, as a unix timestamp in milliseconds
 * @property {number} end - end date, as a unix timestamp in milliseconds
 */

/**
 * @typedef {Object} parsedRow
 * @property {number} date - a unix timestamp in milliseconds
 * @property {number} amountChange
 */

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const softSemesterLimit = MS_PER_DAY * 7; // 1 week

/**
 * Adds two numbers that avoids floating-point errors like `.1 + .2 !== .3`
 * @param {number} x
 * @param {number} y
 * @returns {number} `x + y`, with two digits of precision
 */
export const addCurrency = (x, y) => Math.round(x * 100 + y * 100) / 100;

/**
 * For spring: Sunday, January 9-15
 * For fall: Sunday, August 19-25
 * @param {number} year
 * @param {'Spring' | 'Fall'} season
 * @returns {dayjs.Dayjs} the start date of the given semester
 */
export const getSemesterStart = (year, season) =>
	dayjs(
		season === 'Spring' ? new Date(year, 0, 15) : new Date(year, 7, 25)
	).day(0);

/**
 * For spring: Saturday, May 7-13
 * For fall: Saturday, December 15-21
 * @param {number} year
 * @param {'Spring' | 'Fall'} season
 * @returns {dayjs.Dayjs} the end date of the given semester
 */
export const getSemesterEnd = (year, season) =>
	dayjs(
		season === 'Spring' ? new Date(year, 4, 7) : new Date(year, 11, 15)
	).day(6);

/**
 * @param {number | Date | string} now
 * @returns {semester}
 */
export const findSemester = (now) => {
	const nowDay = dayjs(now);
	let year = nowDay.get('year'),
		season;

	const endFall = getSemesterEnd(year, 'Fall');
	const endSpring = getSemesterEnd(year, 'Spring');

	if (endFall.add(softSemesterLimit, 'ms').isBefore(nowDay)) {
		year++;
		season = 'Spring';
	} else if (endSpring.add(softSemesterLimit, 'ms').isBefore(nowDay)) {
		season = 'Fall';
	} else {
		season = 'Spring';
	}

	return {
		year: year + (season === 'Spring' ? 0.1 : 0.2),
		name: `${season} ${year}`,
		start: getSemesterStart(year, season).valueOf(),
		end: getSemesterEnd(year, season).valueOf(),
	};
};

/**
 * @param {number} num - the currency amount, as a float
 * @returns {string} the amount, formatted with a dollar sign and rounded to two decimal places
 */
export const formatCurrency = num => `${ num < 0 ? '\u2212' : '' }$${ Math.abs(num).toFixed(2) }`;

/** temporary */
export const formatCurrencyOutput = num => (typeof num === 'number' && !isNaN(num)) ? formatCurrency(num) : '$\u2014';

export const formatDate = date => dayjs(date).format('ddd, MMMM D, YYYY');

/**
 * Parses a row from the Flex Point usage table
 * @param {string} row - the row, each cell separated by tabs
 * @returns {parsedRow} the date and the amount changed, or null if an invalid row
 */
export const parseDataRow = row => {
	const [category, dateString, , amount] = row.split('\t');

	if (amount === undefined || category !== 'Flex Points') return null;

	// TODO: use a library to parse the date dependably
	const dateStringFormatted = dateString
		.replace(/\s/g, ' ')
		.replace(/\B[AP]M/, ' $&'); // Add space before AM or PM so Date.parse understands it.
	const date = Date.parse(dateStringFormatted);
	const spentMatch = amount.match(/[\d.]+/);

	if (isNaN(date) || !spentMatch) return null;

	const minusMatch = amount.match(/[-\u2013]/); // look for a minus sign (hyphen or en-dash)
	let amountChange = +spentMatch[0];

	// account for positive/negative changes
	if (minusMatch && minusMatch.index < spentMatch.index) {
		amountChange = -amountChange;
	}

	return  {
		date,
		amountChange,
	};
};
