const express = require('express')
const db = require('./db')
const interactors = require('./interactors')(db)

const router = express.Router()

router.get('/', function (req, res) {
  res.render('home')
})

router.get('/choose/:id', async (req, res) => {
  let choiceTable = await interactors.buildChoiceTable(req.params.id)
  res.render('choose', { choiceTable })
})

router.get('/thanks', (req, res) => {
  res.render('thanks')
})

module.exports = router
