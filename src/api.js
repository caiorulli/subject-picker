const express = require('express')
const db = require('./db')
const interactors = require('./interactors')(db)

const router = express.Router()

router.post('/choose/:id', (req, res) => {
  const studentId = req.params.id
  const choiceIds = req.body.choices
  console.log(`Updating student ${studentId} with choices ${choiceIds}...`)
  interactors.updateChoices(studentId, choiceIds)
    .then(() => {
      console.log('Updated successfully')
      res.json({ success: true })
    })
    .catch(error => {
      console.log(`Error! ${error}`)
      res.json({ success: false, error })
    })
})

module.exports = router
