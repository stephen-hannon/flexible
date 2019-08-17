module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"commonjs": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/recommended",
	],
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module",
	},
	"rules": {
		"comma-dangle": ["warn", "always-multiline"],
		"indent": [
			"warn",
			"tab",
		],
		"quotes": [
			"error",
			"single",
		],
		"semi": [
			"error",
			"always",
		],
		"no-useless-escape": "warn",
		"no-trailing-spaces": "warn",
		"no-console": "warn",
		"max-len": [
			"error",
			{
				"code": 120,
				"ignoreStrings": true,
				"ignoreTemplateLiterals": true,
				"ignoreRegExpLiterals": true,
			},
		],
		"vue/html-indent": ["warn", "tab"],
		"vue/script-indent": ["warn", "tab"],
		"vue/max-attributes-per-line": ["warn", {
			"singleline": 2,
			"multiline": 1,
		  },
		],
	},
};
