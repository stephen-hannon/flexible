import { setDay, addDays, addMilliseconds, getYear, isBefore, startOfDay } from 'date-fns';

/**
 * @typedef {Object} semester
 * @property {number} id - year plus 0.1 if spring, 0.2 if fall
 * @property {string} name - human-readable name: `[Spring|Fall] <year>`
 * @property {number} start - start date, as a unix timestamp in milliseconds
 * @property {number} end - end date, as a unix timestamp in milliseconds
 */

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const softSemesterLimit = MS_PER_DAY * 14; // 2 weeks

export const SeasonsEnum = {
	SPRING: 'Spring',
	FALL: 'Fall',
};

/**
 * Adds two numbers that avoids floating-point errors like `.1 + .2 !== .3`
 * @param {number} x
 * @param {number} y
 * @returns {number} `x + y`, with two digits of precision
 */
export const addCurrency = (x, y) => Math.round(x * 100 + y * 100) / 100;

/**
 * Adds `adjustmentAmount` to the second element of each item in `data`
 * @param {[number, number][]} data - an array of `[date, balance]` pairs
 * @param {number} adjustmentAmount
 * @returns {[number, number][]} the new array
 */
export const adjustBalances = (data, adjustmentAmount) => adjustmentAmount
	? data.map(([first, second]) => [first, addCurrency(second, adjustmentAmount)])
	: data;

/**
 * For spring: Sunday, January 9-15
 * For fall: Sunday, August 19-25
 * @param {number} year
 * @param {'Spring' | 'Fall'} season
 * @returns {Date} the start date of the given semester
 */
export const getSemesterStart = (year, season) => setDay(
	season === SeasonsEnum.SPRING ? new Date(year, 0, 15) : new Date(year, 7, 25),
	0
);

/**
 * For spring: Saturday, May 7-13
 * For fall: Saturday, December 15-21
 * @param {number} year
 * @param {'Spring' | 'Fall'} season
 * @returns {Date} the end date of the given semester
 */
export const getSemesterEnd = (year, season) => setDay(
	season === SeasonsEnum.SPRING ? new Date(year, 4, 7) : new Date(year, 11, 15),
	6
);

/**
 * @param {number | Date} now
 * @param {{end: {}, start: {}}} [manualDates] - key-value pairs of semester IDs and adjusted start/end
 * dates for that semester, if any
 * @returns {semester}
 */
export const findSemester = (now, manualDates = { end: {}, start: {} }) => {
	let year = getYear(now);
	let season;

	const endFall = addDays(
		getSemesterEnd(year, SeasonsEnum.FALL),
		manualDates.end[year + 0.2] || 0
	);

	const endSpring = addDays(
		getSemesterEnd(year, SeasonsEnum.SPRING),
		manualDates.end[year + 0.1] || 0
	);

	if (isBefore(addMilliseconds(endFall, softSemesterLimit), now)) {
		year++;
		season = SeasonsEnum.SPRING;
	} else if (isBefore(addMilliseconds(endSpring, softSemesterLimit), now)) {
		season = SeasonsEnum.FALL;
	} else {
		season = SeasonsEnum.SPRING;
	}

	const id = year + (season === SeasonsEnum.SPRING ? 0.1 : 0.2);

	return {
		id,
		name: `${season} ${year}`,
		start: addDays(getSemesterStart(year, season), manualDates.start[id] || 0).valueOf(),
		end: addDays(getSemesterEnd(year, season), manualDates.end[id] || 0).valueOf(),
	};
};

/**
 *
 * @param {number} ms - a negative value will return null for `perDay` and `perWeek`
 * @param {number} total - should never be negative
 */
export const getRates = (ms, total) => {
	const DAYS_PER_WEEK = 7;

	const days = ms / MS_PER_DAY;
	const weeks = days / DAYS_PER_WEEK;

	const perDay = ms > 0 ? (total / days || 0) : null;
	const perWeek = ms > 0 ? (total / weeks || 0) : null;

	return {
		total,
		perDay,
		perWeek,
	};
};

/**
 * Calculates an array of numbers between `x1` and `x2`, such the middle numbers differ from each
 * other by `step` and are divisible by `step`
 * @param {number} x1 - the starting number
 * @param {number} x2 - the ending number
 * @returns {number[]}
 */
export const interpolate = (x1, x2) => {
	const returnArr = [x1];
	let dateX = startOfDay(addDays(x1, 1));

	while (isBefore(dateX, x2)) {
		returnArr.push(dateX.valueOf());
		dateX = addDays(dateX, 1);
	}

	returnArr.push(x2);

	return returnArr;
};

/**
 * Given `x`, computes `y` such that `(x, y)` lies on the line created between `(x1, y1)` and `(x2, y2)`.
 * `y` is clamped to always be between `y1` and `y2`.
 * @param {number} x
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 * @returns {number} y
 */
export const interpolatePoint = (x, x1, x2, y1, y2) => {
	const xNormalized = (x - x1) / (x2 - x1);
	const xNormalizedClamped = Math.max(0, Math.min(xNormalized, 1));
	return xNormalizedClamped * (y2 - y1) + y1;
};

/**
 * Outputs an array of evenly spaced `(x, y)` pairs between `(x1, y1)` and `(x2, y2)`
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 * @returns {[number, number][]}
 */
export const interpolateLine = (x1, x2, y1, y2) => {
	return x1 !== x2
		? interpolate(x1, x2).map(x => [x, interpolatePoint(x, x1, x2, y1, y2)])
		: [
			[x1, y1],
			[x2, y2],
		];
};
