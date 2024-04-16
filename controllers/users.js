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
   
    try {
        const passwordHash = await bcrypt.hash(password,10)
        
        const userObject = new User({ username, name, email, passwordHash })
        const savedUser = await userObject.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/:id', async(request,response,next) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        response.sendStatus(204)
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