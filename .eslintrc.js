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
		"ecmaVersion": 2018,
		"sourceType": "module",
	},
	"rules": {
		"array-callback-return": "warn",
		"brace-style": "warn",
		"comma-dangle": ["warn", {
			"arrays": "always-multiline",
			"objects": "always-multiline",
			"imports": "always-multiline",
			"functions": "only-multiline"
		}],
		"indent": [
			"warn",
			"tab",
		],
		"implicit-arrow-linebreak": "warn",
		"keyword-spacing": "warn",
		"max-len": [
			"error",
			{
				"code": 110,
				"ignoreStrings": true,
				"ignoreTemplateLiterals": true,
				"ignoreRegExpLiterals": true,
			},
		],
		"newline-per-chained-call": "warn",
		"no-console": "warn",
		"no-trailing-spaces": "warn",
		"no-unneeded-ternary": "warn",
		"no-useless-escape": "warn",
		"nonblock-statement-body-position": "error",
		"operator-linebreak": ["warn", "before"],
		"object-curly-spacing": ["warn", "always"],
		"object-shorthand": "warn",
		"one-var": ["warn", "never"],
		"quotes": [
			"error",
			"single",
		],
		"semi": [
			"error",
			"always",
		],
		"space-before-blocks": "warn",
		"spaced-comment": "warn",
		"vue/html-indent": ["warn", "tab"],
		"vue/script-indent": ["warn", "tab"],
		"vue/max-attributes-per-line": ["warn", {
			"singleline": 2,
			"multiline": 1,
		  },
		],
	},
};
