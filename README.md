# Goji Chrome Extension

[![CodeQL](https://github.com/getgoji/goji-chrome-extension/actions/workflows/codeql.yml/badge.svg)](https://github.com/getgoji/goji-chrome-extension/actions/workflows/codeql.yml)
[![Reformat and Lint](https://github.com/getgoji/goji-chrome-extension/actions/workflows/reformat-and-lint.yml/badge.svg)](https://github.com/getgoji/goji-chrome-extension/actions/workflows/reformat-and-lint.yml)

Seeding Sustainability. A Chrome extensions that helps you see how sustainable your favorite fashion brands are!

Learn more about this amazing platform here at [getgoji.tech](http://getgoji.tech)

# Installation and Usage

You can install the extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/goji/pjeeheedkpjojpgkpmbopfcopniinfdn)

## Manual Installation (and for development)

1. Clone or download this repository and extract the contents
2. Navigate to it and run `npm i` in the terminal
3. Run `npm run dev` to start the development server, or `npm run build` to make a production build
4. In your Chrome-based browser (Google Chrome, Microsoft Edge, etc.), navigate to `chrome://extensions`
5. Enable Developer Mode by clicking the toggle switch next to Developer mode.
6. Click the Load unpacked button, navigate to the `build` subdirectory of the code, and select the build folder.
7. Navigate to your favorite brand's website and see how they rank on Goji!

# Credits

Extension code: Andrew Kuhn & Kenneth Yang

[Data extraction and processing](https://github.com/jasmine-schoch/goji-data-analysis): Jasmine Schoch & Virginia Wang
