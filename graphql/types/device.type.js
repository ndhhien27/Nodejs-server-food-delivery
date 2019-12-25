export default `
  type Device{
    _id: String!
    fcmTokenUser: String
    fcmTokenMerchant: String
    user: User
    uniqueId: String!
    merchant: Merchant
  }

  type Mutation{
    clearUserDeviceInfo(uniqueId: String!): Device!
    clearMerchantDeviceInfo(uniqueId: String!): Device!
  }
`