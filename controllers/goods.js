const goodsRouter = require('express').Router()
const Good = require('../models/good')

goodsRouter.get('/', async (request, response, next) => {
    try {
        const goods = await Good.find({})
        response.json(goods)
    } catch (error) {
        next(error)
    }
})

goodsRouter.get('/:id', async (request, response, next) => {
    try {
        const good = await Good.findById(request.params.id)
        response.json(good)
    } catch (error) {
        next(error)
    }
})

goodsRouter.post('/', async (request, response, next) => {
    const { name, price } = request.body
    const goodObject = new Good({ name, price })
    try {
        const savedGood = await goodObject.save()
        response.status(201).json(savedGood)
    } catch (error) {
        next(error)
    }
})

goodsRouter.put('/:id', async (request, response, next) => {
    const { name, price } = request.body
    try {
        const updatedGood = await Good.findByIdAndUpdate(
            request.params.id,
            { name, price },
            { new: true }
        )
        response.status(201).json(updatedGood)
    } catch (error) {
        next(error)
    }
})

goodsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Good.findByIdAndDelete(request.params.id)
        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
})


module.exports = goodsRouter