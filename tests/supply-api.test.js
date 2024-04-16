const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test-helper')

beforeEach(async () => {
    await User.deleteMany({})
    for (let user of helper.users) {
        const userObject = new User(user)
        await userObject.save()
    }
})

describe('when there are initially some users saved', () => {
    test('users are returned as json', async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(helper.users.length)
    })

    test('a specific user is within the returned users', async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const names = response.body.map(u => u.name)
        expect(names).toContain(helper.users[0].name)
    })
})

describe('fetching a single user', () => {
    test('succeeds given a valid id', async () => {
        const usersInDB = await helper.usersInDB()
        await api.get(`/api/users/${usersInDB[0].id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('fails when given an invalid id', async () => {
        await api.get(`/api/users/dqwqwr`)
            .expect(400)
    })

    test('fails when given a nonExistent id', async () => {
        const nonExistentId = await helper.nonExistentId()
        await api.get(`/api/users/${nonExistentId}`)
            .expect(404)
    })
})

describe('addition of a new user', () => {
    test('succeds when given valid data ', async () => {
        const usersAtStart = await helper.usersInDB()
        const response = await api.post('/api/users')
            .send(helper.validData)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })

    test('fails with statuscode 400 when given invalid data ', async () => {
        const usersAtStart = await helper.usersInDB()
        const response = await api.post('/api/users')
            .send(helper.invalidData)
            .expect(400)
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('deleting a user', () => {
    test('succeds given a valid id', async() => {
        const usersAtStart = await helper.usersInDB()
        const response = await api.delete(`/api/users/${usersAtStart[0].id}`)
            .expect(204)
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length - 1)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})