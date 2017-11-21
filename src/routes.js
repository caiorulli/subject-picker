const express = require('express')
const db = require('./db')

const router = express.Router()

// Renders public/home
// Page should have a way to send custom get to 'choose' page
router.get('/', function (req, res) {
  res.render('home')
})

// Returns all subjects and the current choices for student with id :id
// Renders public/choose.hbs
router.get('/:id', async (req, res) => {
  let subjects = await db.getSubjects()
  let choices = await db.getChoices(req.params.id)
  res.render('choose', { subjects, choices })
})

// Saves array of choices send via post for student with id :id
// Renders public/thanks.hbs
router.post('/:id', (req, res) => {
  db.updateChoices(req.params.id, req.body.choices)
  res.render('thanks')
})

module.exports = router
