const uuid = require('uuid/v4')
const db = require('../../db/snacks')


getAll = (limit) => {
  const snacks = !limit ? db : (limit > db.length) ? false : db.slice(0, limit)
  return snacks
}


getById = (id) => {
  const snack = db.find(snack => {return snack.id === id})
  return snack
}


create = (body) => {
  const errors = []
  const id = body.id
  const name = body.name

  let response

  if (!id || !name) {
    if (!id) errors.push('Fill the id field')
      if (!name) errors.push('Fill the name field')
    response = { errors }

  } else {
    const snack = ({id: uuid(), name})
    snacks.push(snack)
    response = snack
  }
  return response
}


update = (id, body) => {
  let index = db.findIndex(snack => { return snack.id === id})

  const errors = []
  let response

  if (!id || !body.name || !index) {
    if (!id) errors.push(`Not found id of ${id}`)
    if (!body.name) errors.push('Fill the name field')
    if (!index) errors.push(`not found snack of id ${id}`)

    response = {errors}
  } else {
    const snack = ({id, name: body.name})
    console.log(snack);
    db[index] = snack
    response = snack
  }
  return response
}

deleteSnack = (id) => {
  const index = db.findIndex(snack => { return  snack.id === id})
  const error = []

  if (index === -1) {
    error.push(`Snack's id ${id} is not found`)
    response = { error }
  } else {
    response = db.splice(index, 1)
  }
  return response
}

module.exports = {getAll, getById, create, update, deleteSnack}
