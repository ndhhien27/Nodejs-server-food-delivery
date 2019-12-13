export default `
  type Merchant{
    _id: ID!
    fName: String!
    lName: String!
    password: String
    email: String!
    phone: String!
    createdRestaurants: Restaurant
  }

  type Query{
    merchants: [Merchant!]!
    merchantById(merchantId: ID!): Merchant!
  }

  type AuthMerchantData{
    merchantId: ID!
    fName: String!
    lName: String!
    authToken: String!
    tokenExpiration: Int!
  }

  type Mutation{
    createMerchant(merchantInput: MerchantInput!): Merchant!
    merchantLogin(loginInput: MerchantLoginInput!): AuthMerchantData!
    updateMerchant(merchantId: ID!, updateValue: UpdateMerchantInput!): Merchant!
  }

  input UpdateMerchantInput{
    fName: String
    lName: String
    email: String
  }

  input MerchantLoginInput{
    email: String!
    password: String!
    uniqueId: String!
    fcmTokenMerchant: String!
  }

  input MerchantInput{
    fName: String!
    lName: String!
    phone: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
`