const mysql = require('mysql')

const connectionContract = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: 'subjectpicker'
}

const query = async (query, params = []) => {
  const connection = mysql.createConnection(connectionContract)
  const promise = new Promise((resolve, reject) =>
    connection.query(query, params, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
  )
  connection.end()
  return promise
}

const getStudent = async id =>
  query('SELECT * FROM ESTUDANTES WHERE RA = ?', [id])

const getChoices = async id =>
  query('SELECT * FROM ELETIVAS WHERE RA = ?', [id])

const getSubjects = async () =>
  query('SELECT * FROM DISCIPLINAS ORDER BY CH DESC')

const getSubjectsFromChoices = async choiceIds =>
  query('SELECT * FROM DISCIPLINAS WHERE ID in (?)', [choiceIds])

const deleteChoices = async id =>
  query('DELETE FROM ELETIVAS WHERE RA = ?', [id])

const insertChoice = async (id, choice) =>
  query('INSERT INTO ELETIVAS (RA, ID_ELETIVA) VALUES(?)', [[id, choice]])

module.exports = {
  getStudent,
  getChoices,
  getSubjects,
  getSubjectsFromChoices,
  deleteChoices,
  insertChoice
}
