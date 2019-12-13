export default `
  type NotificationOrder{
    _id: ID!
    title: String!
    user: User!
    order: Order!
    restaurant: Restaurant!
    createdAt: String!
    hasRead: Boolean!
  }

  type Query{
    notificationByUser(userId: ID!): [NotificationOrder!]
    notificationByRest(restId: ID!): [NotificationOrder!]
  }

  type Mutation{
    markAsRead(notificationId: ID!): NotificationOrder!
  }

  `