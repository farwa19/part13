const express = require('express')
const todoStatistics = require('../redis')

const router = express.Router()

router.get('/', async (_, res) => {
  const added_todos = await todoStatistics.getCount()
  res.send({ added_todos })
})

module.exports = router
