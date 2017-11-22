const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'subjectpicker'
})

const select = async (query, params = []) =>
  new Promise((resolve) =>
    connection.query(query, params, function (error, results, fields) {
      if (error) throw error
      resolve(results)
    })
  )

const getChoices = async (id) =>
  select('SELECT * FROM ELETIVAS WHERE RA = ?', [id])

const getSubjects = async () =>
  select('SELECT * FROM DISCIPLINAS ORDER BY COD_ELETIVA DESC')

const updateChoices = (id, choices) => {
  if (choices && choices.forEach) {
    connection.query('DELETE FROM ELETIVAS WHERE RA = ?', [id], (error) => { if (error) throw error })
    choices.forEach(choice => {
      connection.query('INSERT INTO ELETIVAS SET ?', { RA: id, ID_ELETIVA: choice }, (error) => { if (error) throw error })
    })
  } else {
    throw new Error('No choice payload')
  }
}

module.exports = {
  getChoices,
  getSubjects,
  updateChoices
}
