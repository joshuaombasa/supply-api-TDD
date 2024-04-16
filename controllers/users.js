const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const saltrounds = 10

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (error) {
        next(error)
    }
})


usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) {
            return response.sendStatus(404)
        }
        response.json(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, email, password } = request.body
    const passwordHash = await bcrypt.hash(password,10)
    try {
        const userObject = new User({ username, name, email, passwordHash })
        const savedUser = await userObject.save()
        response.status(201).json(savedUser)
        response.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

// usersRouter.get('/', async(request,response,next) => {
//     try {

//     } catch (error) {
//         next(error)
//     }
// })

module.exports = usersRouter