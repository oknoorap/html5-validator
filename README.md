# :passport_control: html5-validator
> Dead-simple HTML5 validator using [API](https://validator.w3.org/docs/api.html) Provided by W3.

## Install
Using NPM
```bash
$ npm install html5-validator --save
```

Using Yarn
```bash
$ yarn add html5-validator
```

If you want to use CLI version, please install it globally.

```bash
# NPM
$ npm install html5-validator -g

# Yarn
$ yarn global add html5-validator
```

## Usage
```javascript
const validate = require('html5-validator')

// Check website
validate('https://www.w3.org').then(result => {
  console.log(result)
})

// Check File
validate('/path/to/file.html').then(result => {
  console.log(result)
})

// Check Source
const htmlSource = `<!DOCTYPE html><html><head><title>HTML5 Validator</title></head><body>Content goes here...</body></html>`
validate(htmlSource).then(result => {
  console.log(result)
})
```

## CLI
```bash

html5v - W3 Validation Tool

  USAGE

    html5v    [source]

  ARGUMENTS

    [source]    Source could be url, filename, or quoted strings. optional 

  OPTIONS

    --skip-warning    Skip warning message. optional

```

## License
MIT © [oknoorap](https://github.com/oknoorap)
