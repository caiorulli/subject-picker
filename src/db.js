const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'subjectpicker'
})

const query = async (query, params = []) =>
  new Promise((resolve, reject) =>
    connection.query(query, params, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
  )

const getChoices = async (id) =>
  query('SELECT * FROM ELETIVAS WHERE RA = ?', [id])

const getSubjects = async () =>
  query('SELECT * FROM DISCIPLINAS ORDER BY CH DESC')

const deleteChoices = async (id) =>
  query('DELETE FROM ELETIVAS WHERE RA = ?', [id])

const insertChoice = async ({ id, choice }) =>
  query('INSERT INTO ELETIVAS SET ?', {
    RA: id,
    ID_ELETIVA: choice
  })

module.exports = {
  getChoices,
  getSubjects,
  deleteChoices,
  insertChoice
}
