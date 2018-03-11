const model = require('../models/snacks')


getAll = (req, res, next) => {
  const limit = req.query.limit
  const data  = model.getAll(limit)

  if (!data) {
    return next({
      status: 404,
      message: `Could not list snacks of limit ${limit}`
    })
  }
  res.status(200).json({data})
}


getById = (req, res, next) => {
  const id = req.params.id
  const snack = model.getById(id)

  if (!snack){
    return next ({
      status: 404,
      message: `Could not find snack id of ${id}`
    })
  }
  res.status(200).json({snack})
}


create = (req, res, next) => {
  const snack = model.create(req.body)

  if (snack.errors) {
    return next({
      status: 400,
      message: 'The name or id field is missing',
      error: snack.errors
    })
  }
  res.status(201).json({ snack })
}


update = (req, res, next) => {
  const id = req.params.id
  const updateSnack = model.update(id, req.body)

  if (!updateSnack) {
    return next({
      status: 400,
      message: `Not a snack found with id of ${id}`
    })
  }
  res.status(200).json({snack: updateSnack})
}


deleteSnack = (req, res, next) => {
  const id = req.params.id
  console.log('id = ', id);
  const result = model.deleteSnack(id)
  console.log('result = ', result);

  if (result.error) {
    return next({
      status: 404,
      messager: `Not found snack id ${id}`,
      error: result.error
    })
  }
  res.status(204).json()
}

module.exports = {getAll, getById,  create, update, deleteSnack}
