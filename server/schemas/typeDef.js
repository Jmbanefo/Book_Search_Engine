const { gql } = require('apollo-server-express')

const typeDefs = gql`
   
    type User { 
    _id: ID
    username: String
    password: String
    email: String
    savedBook: [Book]
    bookCount: Int
}

    type Book { 
    bookID: String
    title: String
    authors: [String]
    image: String
    description: String
    link: String
}

    type Auth{ 
    token: ID!
    user: User
}

    type Query { 
    me: User
}

    type Mutation { 
    
    login(email: String!, password: String!): Auth
    
    addUser(username: String!, email: String!, password: String!): Auth

    savedBook( bookID: String, title: String, authors: [String], description: String, image: String, link: String): User

    removeBook(bookID: String): User

    }`; 

module.exports = typeDefs; 

