const { ApolloServer } = require('apollo-server')
const connectDB = require('./config/db')
const resolvers = require('./schema/resolvers')
const typeDefs = require('./schema/typeDefs')
require('dotenv').config()
require('colors')

connectDB()

const server = new ApolloServer({
    cors: {
        origin: "*",
        credentials: true
    },
    resolvers,
    typeDefs,
})

const PORT = process.env.PORT || 5000

server.listen(PORT).then(({ url }) => {
    console.log(`Server running at ${url}`.green)
})