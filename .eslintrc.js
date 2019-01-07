module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-useless-escape": "warn",
        "no-trailing-spaces": "warn",
        "no-console": "warn"
    }
};