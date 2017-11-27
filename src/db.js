const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: 'subjectpicker'
  })

const query = async (query, params = []) =>
  new Promise((resolve, reject) =>
    connection.query(query, params, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
  )

const getStudent = async (id) =>
  query('SELECT * FROM ESTUDANTES WHERE RA = ?', [id])

const getChoices = async (id) =>
  query('SELECT * FROM ELETIVAS WHERE RA = ?', [id])

const getSubjects = async () =>
  query('SELECT * FROM DISCIPLINAS ORDER BY CH DESC')

const getSubjectsFromChoices = async (choiceIds) => {
  query('SELECT * FROM DISCIPLINAS WHERE ID in ?', [choiceIds])
}

const deleteChoices = async (id) =>
  query('DELETE FROM ELETIVAS WHERE RA = ?', [id])

const insertChoice = async ({ id, choice }) =>
  query('INSERT INTO ELETIVAS SET ?', {
    RA: id,
    ID_ELETIVA: choice
  })

module.exports = {
  getStudent,
  getChoices,
  getSubjects,
  getSubjectsFromChoices,
  deleteChoices,
  insertChoice
}
