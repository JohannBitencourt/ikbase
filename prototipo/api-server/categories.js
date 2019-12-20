const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'desenvolvimento',
        path: 'desenvolvimento'
      },
      {
        name: 'análise',
        path: 'análise'
      },
      {
        name: 'outros tópicos',
        path: 'outros tópicos'
      }
  ]
}

function getData (token) {

  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
