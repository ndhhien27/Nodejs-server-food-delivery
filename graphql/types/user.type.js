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
    createdRestaurants: [Restaurant!]
  }

  type Query{
    users: [User!]!
  }

  type AuthData{
    userId: ID!
    fName: String!
    lName: String!
    authToken: String!
  }

  type Mutation{
    createUser(userInput: UserInput!): User!
    bookmark(restaurantId: ID!, userId: ID!): User!
    login(email: String!, pass: String!): AuthData!
  }

  input UserInput{
    fName: String!
    lName: String!
    email: String!
    password: String!
  }
`