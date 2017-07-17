const {existsSync, statSync, readFile} = require('fs')
const url = require('url')
const normalizeUrl = require('normalize-url')
const axios = require('axios')

const apiUrl = 'https://validator.w3.org/nu/?out=json&parser=html5'
const config = {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'User-Agent': 'Validator.nu/LV http://validator.w3.org/services'
  }
}

const viewSource = url => new Promise((resolve, reject) => {
  axios.get(normalizeUrl(url), config)
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
})

const validator = stringSource => new Promise((resolve, reject) => {
  const data = Buffer.from(stringSource)
  axios.post(apiUrl, data, config)
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
})

module.exports = source => new Promise((resolve, reject) => {
  const uri = url.parse(source)

  if (uri.protocol && uri.host) {
    return viewSource(source).then(htmlSource => {
      validator(htmlSource).then(resolve).catch(reject)
    }).catch(reject)
  }

  if (existsSync(source) && statSync(source).isFile()) {
    readFile(source, 'ascii', (err, data) => {
      if (err) {
        reject(err)
      }

      validator(data).then(resolve).catch(reject)
    })
  } else {
    validator(source).then(resolve).catch(reject)
  }
})
