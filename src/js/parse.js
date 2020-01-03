import { parse } from 'date-fns';
import {
	addCurrency,
} from './utils';

/**
 * @typedef {Object} parsedRow
 * @property {number} amountChange
 * @property {number} date - a unix timestamp in milliseconds
 * @property {string} details - the third column of the data
 */

/**
 * @typedef {Object} parsedData
 * @property {number} [newStartBalance] - if defined, the new starting balance, according to the data
 * @property {number[][]} parsedRawData
 * @property {boolean} rawDataComplete - whether the data goes back to the semester beginning
 * @property {boolean} rawDataCompleteEnd - whether the data starts with the semseter ending
 */

// Lowest starting Flex Point balance of all meal plans
// https://dining.nd.edu/services/meal-plans/off-campus-undergrads-graduate-students/
const MIN_START_BALANCE = 110;

/**
 * How we parse:
 * * Iterate through `rawData` (which is in reverse chronological order)
 * * Prepend each flex point change to the beginning of the data list, assuming for now that it ends at zero.
 * * Stop iterating when we reach a row that is the addition of `startBalance` (i.e., the semester start).
 * * If this is never reached (i.e., some data is missing), ask them for their current balance and attempt to
 *   display the data that way.
 * @param {string} rawData - the table data, lines separated by linefeeds
 * @param {number} startBalance
 * @returns {parsedData}
 */
export const parseData = (rawData, startBalance) => {
	const data = rawData.split('\n');
	const parsedRawData = [];
	let rawDataComplete = false;
	let rawDataCompleteEnd = false;
	let previousChange = 0;
	let newStartBalance;

	for (let i = 0; i < data.length && !rawDataComplete; i++) {
		const parseResult = parseDataRow(data[i]);

		if (parseResult !== null) {
			const { date, amountChange, details } = parseResult;

			if (details === 'GUI Location' && parsedRawData.length === 0) {
				rawDataCompleteEnd = true;
			}

			const firstAmount = parsedRawData[0]
				? addCurrency(parsedRawData[0][1], -previousChange)
				: 0;
			previousChange = amountChange;

			parsedRawData.unshift([date, firstAmount]);

			if (amountChange === startBalance) {
				rawDataComplete = true;
			} else if (details === 'PatronImport Location' && amountChange >= MIN_START_BALANCE) {
				// If the data has a different starting balance than the UI, trust the data.
				rawDataComplete = true;
				newStartBalance = amountChange;
			}
		}
	}

	return {
		parsedRawData,
		rawDataComplete,
		rawDataCompleteEnd,
		newStartBalance,
	};
};

/**
 * Parses a row from the Flex Point usage table
 * @param {string} row - the row, each cell separated by tabs
 * @returns {parsedRow} the date and the amount changed, or null if an invalid row
 */
export const parseDataRow = row => {
	const [category, dateString, details, amount] = row.split('\t');

	if (amount === undefined || category !== 'Flex Points') return null;

	const date = parse(dateString, 'MMMM d, yyyy hh:mma', new Date()).valueOf();
	const spentMatch = amount.match(/[\d.]+/);

	if (isNaN(date) || !spentMatch) return null;

	const minusMatch = amount.match(/[-\u2013]/); // look for a minus sign (hyphen or en-dash)
	let amountChange = +spentMatch[0];

	// account for positive/negative changes
	if (minusMatch && minusMatch.index < spentMatch.index) {
		amountChange = -amountChange;
	}

	return {
		date,
		amountChange,
		details,
	};
};
