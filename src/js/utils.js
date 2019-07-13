import dayjs from 'dayjs';

/**
 * @typedef {Object} semester
 * @property {number} year - year plus 0.1 if spring, 0.2 if fall
 * @property {string} name - human-readable name: `[Spring|Fall] <year>`
 * @property {number} start - start date, as a unix timestamp in milliseconds
 * @property {number} end - end date, as a unix timestamp in milliseconds
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
 * @returns {dayjs.Dayjs} the start date of the given semester
 */
export const getSemesterStart = (year, season) => (
	dayjs(
		season === 'Spring' ? new Date(year, 0, 15) : new Date(year, 7, 25)
	).day(0)
);

/**
 * For spring: Saturday, May 7-13
 * For fall: Saturday, December 15-21
 * @param {number} year
 * @param {'Spring' | 'Fall'} season
 * @returns {dayjs.Dayjs} the end date of the given semester
 */
export const getSemesterEnd = (year, season) => (
	dayjs(
		season === 'Spring' ? new Date(year, 4, 7) : new Date(year, 11, 15)
	).day(6)
);

/**
 * @param {number | Date | string} now
 * @returns {semester}
 */
export const findSemester = (now) => {
	const nowDay = dayjs(now);
	let year = nowDay.get('year');
	let season;

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
 * Calculates an array of numbers between `x1` and `x2`, such the middle numbers differ from each
 * other by `step` and are divisible by `step`
 * @param {number} x1 - the starting number
 * @param {number} x2 - the ending number
 * @param {number} step - how much to increase each number by
 * @returns {number[]}
 */
export const interpolate = (x1, x2, step = MS_PER_DAY) => {
	const returnArr = [];
	let x = x1;

	const startOffset = step - (x1 % step);
	if (startOffset) {
		returnArr.push(x1);
		x += startOffset;
	}

	while (x < x2) {
		returnArr.push(x);
		x += step;
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
