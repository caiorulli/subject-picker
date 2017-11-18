const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

// router.get('/:id', function (req, res) {
//   // const subjects = db.getSubjects()
//   const choices = db.getChoices(req.params.id)
//   res.render('index', { choices })
// })

// router.post('/:id', function (req, res) {
//   // db.setChoices(req.params.id, req.params.choices)
// })

router.get('/test', function (req, res) {
  const choices = db.getChoices(11510005)
  const subjects = db.getSubjects()
  res.render('test', { choices, subjects })
})

module.exports = router
