const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', function (req, res) {
  res.render('home')
})

router.get('/choose/:id', async (req, res) => {
  let choiceTable = await db.buildChoiceTable(req.params.id)
  res.render('choose', { choiceTable })
})

router.get('/thanks', (req, res) => {
  res.render('thanks')
})

router.post('/choose/:id', (req, res) => {
  db.updateChoices(req.params.id, req.body.choices)
  res.json({ success: true })
})

router.get('/test', (req, res) => {
  res.render('index')
})

module.exports = router
