const express = require('express')
const db = require('./db')
const actions = require('./actions')(db)

const router = express.Router()

router.post('/choose/:id', (req, res) => {
  actions.updateChoices(req.params.id, req.body.choices)
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ success: false, error }))
})

module.exports = router
