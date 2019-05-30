# Online Flex Point Analyzer

[![Build Status](https://travis-ci.com/stephen-hannon/flexible.svg?branch=master)](https://travis-ci.com/stephen-hannon/flexible)

See it in action at https://stephen-hannon.github.io/flexible

## Development

First, make sure you have [Git](https://git-scm.com/) and [Node & NPM](https://nodejs.org/) installed. Clone the repository and install the modules from the `flexible` directory:

```bash
git clone https://github.com/stephen-hannon/flexible.git
cd flexible
npm install
```

Flexible uses [Webpack](https://webpack.js.org/) to bundle its assets, so start a development server to avoid manually re-compiling after each save:

```bash
npm start
```

For a one-time development build, run:

```bash
npm run build-dev
```

To build for production, run:

```bash
npm run build
```
