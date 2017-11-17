const connection = require('./connection')

const getChoices = (id) => {
  return new Promise((resolve, reject) => {
    connection.connect()
    connection.query('SELECT * FROM ESCOLHAS WHERE RA = ?', [id], function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
    connection.end()
  })
}

module.exports = getChoices
