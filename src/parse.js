import {
	addCurrency,
} from './utils';

/**
 * @typedef {Object} parsedRow
 * @property {number} date - a unix timestamp in milliseconds
 * @property {number} amountChange
 */

/**
 * @typedef {Object} parsedData
 * @property {number[][]} parsedRawData
 * @property {boolean} rawDataComplete - whether the data goes back to the semester beginning
 */

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
	let previousChange = 0;

	for(let i = 0; i < data.length && !rawDataComplete; i++) {
		const parseResult = parseDataRow(data[i]);

		if (parseResult !== null) {
			const { date, amountChange } = parseResult;

			const firstAmount = parsedRawData[0]
				? addCurrency(parsedRawData[0][1], -previousChange)
				: 0;
			previousChange = amountChange;

			parsedRawData.unshift([date, firstAmount]);

			if (amountChange === startBalance) {
				rawDataComplete = true;
			}
		}
	}

	return {
		parsedRawData,
		rawDataComplete,
	};
};

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

	return {
		date,
		amountChange,
	};
};
