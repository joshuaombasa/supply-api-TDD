const User = require('../models/user')


const users = [
    {
        username: "john_doe",
        name: "John Doe",
        email: "john@example.com",
        passwordHash: "password123"
    },
    {
        username: "jane_smith",
        name: "Jane Smith",
        email: "jane@example.com",
        passwordHash: "securepassword"
    },

];

const validData = {
    username: "bob_jenkins",
    name: "Bob Jenkins",
    email: "bob@example.com",
    passwordHash: "mysecretpass"
}

const usersInDB = async () => {
    const users = await User.find({})
    const usersList = users.map(user => user.toJSON())
    return usersList
}

const nonExistentId = async () => {
    const userObject = new User({
        username: "bob_jenkins",
        name: "Bob Jenkins",
        email: "bob@example.com",
        passwordHash: "mysecretpass"
    })

    const savedUser = await userObject.save()

    await User.findByIdAndDelete(savedUser._id)
    return savedUser._id.toString()
}


module.exports = { users, usersInDB, nonExistentId, validData }