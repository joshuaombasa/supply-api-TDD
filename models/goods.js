const mongoose = require('mongoose')


const goodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
})


goodSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



module.exports = mongoose.model('Good', goodSchema)