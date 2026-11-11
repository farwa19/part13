const express = require('express');
const mongoose = require('mongoose');
const todoStatistics = require('../redis')
const { Todo } = require('../mongo')
const router = express.Router();



router.get('/statistics', async (_, res) => {
  const added_todos = await todoStatistics.getCount()
  res.send({ added_todos })
})
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  await todoStatistics.increment();
  res.send(todo);
});



router.get('/', async (_, res) => {
  const added_todos = await todoStatistics.getCount()
  res.send({ added_todos })
})

module.exports = router


const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  if (!mongoose.isObjectIdOrHexString(id)) return res.sendStatus(400)

  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text;
  req.todo.done = req.body.done;
  await req.todo.save();
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
