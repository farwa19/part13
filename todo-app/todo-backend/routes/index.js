const express = require('express');
const router = express.Router();

const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  const redisVisits = await redis.increment('visits')
  visits = redisVisits === null ? visits + 1 : redisVisits

  res.send({
    visits
  });
});

module.exports = router;
