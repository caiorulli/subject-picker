const express = require('express')
const db = require('./db')
const interactors = require('./interactors')(db)

const router = express.Router()

router.get('/', function (req, res) {
  res.render('login')
})

router.get('/choose/:id', (req, res) => {
  interactors
    .buildChoiceTable(req.params.id)
    .then(choiceTable => res.render('list', { choiceTable }))
    .catch(error => res.render('error', { error }))
})

router.post('/validate', async (req, res) => {
  const studentId = req.body.ra
  const choiceIds = req.body.choices
  console.log(`Updating student ${studentId} with choices ${choiceIds}...`)
  try {
    await interactors.updateChoices(studentId, choiceIds)
    console.log('Updated successfully')
    res.render('success')
  } catch (e) {
    console.log(`Error! ${e}`)
    res.render('failure')
  }
})

module.exports = router
