export default `
  type User{
    _id: ID!
    fName: String!
    lName: String!
    password: String
    email: String!
    phone: String!
    likes: [Food!]!
    orders: [Order!]
    bookmarks: [Restaurant!]
  }

  type Query{
    users: [User!]!
  }

  type Mutation{
    createUser(userInput: UserInput!): User!
    bookmark(restaurantId: ID!, userId: ID!): User!
  }

  input UserInput{
    fName: String!
    lName: String!
    email: String!
    password: String!
  }
`