const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'subjectpicker'
})

const getChoices = (id) => {
  return connection.query('SELECT * FROM ELETIVAS WHERE RA = ?', [id], function (error, results, fields) {
    if (error) console.log(error)
    console.log(results)
    return results
  })
}

const getSubjects = () => {
  return connection.query('SELECT * FROM DISCIPLINAS', [], function (error, results, fields) {
    if (error) console.log(error)
    console.log(results)
    return results
  })
}

module.exports = {
  connection,
  getChoices,
  getSubjects
}
