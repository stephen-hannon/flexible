#!/usr/bin/env node
/* eslint-env node */

console.log(process.argv);

let fs = require('fs');
const ALL_FILE = 'alldata.json';

if (process.argv[2]) {
	fs.readFile(process.argv[2], (err, data) => {
		if (err) throw err;
		
		console.log(data.length);
		
});
} else {
	console.log('Missing file name argument');
}
