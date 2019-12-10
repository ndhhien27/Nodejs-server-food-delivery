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
    createdRestaurants: [Restaurant!]
    device: [Device!]
    numNotification: Int!
  }

  type Device{
    _id: String!
    fcmToken: String!
    user: ID!
    uniqueId: String!
  }

  type Position{
    address: String!
    lat: Float!
    long: Float!
  }

  type Query{
    users: [User!]!
    userById(userId: ID!): User!
  }

  type Payment{
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
    merchantLogin(email: String!, password: String!): AuthData!
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
    fcmToken: String!
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