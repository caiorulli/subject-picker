const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index')
})

router.get('/:id', function (req, res, next) {
  const choices = db.getChoices(req.params.id)
  res.render('choices', { choices })
})

module.exports = router
