export default `
  type User{
    _id: ID!
    fName: String!
    lName: String!
    password: String
    email: String!
    position: [Position!]
    payment: [Payment!]!
    phone: String!
    likes: [Food!]
    orders: [Order!]
    bookmarks: [Restaurant!]
    device: [Device!]
    numNotification: Int!
  }

  type Position{
    _id: ID!
    address: String!
    lat: Float!
    long: Float!
  }

  type Query{
    users: [User!]!
    userById(userId: ID!): User!
  }

  type Payment{
    _id: ID!
    paymentType: String!
    detail: String!
  }

  type AuthData{
    userId: ID!
    fName: String!
    lName: String!
    authToken: String!
    tokenExpiration: String
  }

  type Mutation{
    createUser(userInput: UserInput!): User!
    bookmark(restaurantId: ID!, userId: ID!): User!
    login(loginInput: LoginInput!): AuthData!
    updateUser(userId: ID!, updateValue: UpdateUserInput!): User!
  }

  input UpdateUserInput{
    fName: String
    lName: String
    numNotification: Int
    position: PositionInput
    email: String
  }

  input PositionInput{
    address: String!
    lat: Float!
    long: Float!
  }

  input LoginInput{
    email: String!
    password: String!
    uniqueId: String!
    fcmTokenUser: String!
  }

  input UserInput{
    fName: String!
    lName: String!
    phone: String!
    email: String!
    password: String!
    confirmPassword: String!
    position: PositionInput!
  }
`