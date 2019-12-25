export default `
  type Order{
    _id: ID!
    user: User!
    items: [Item!]!
    delivery_position: Position!
    restaurant: Restaurant!
    createdAt: String!
    updatedAt: String!
    status: String!
    total: String!
    subtotal: String!
    payment: Payment!
    review: Review
  }

  type Item{
    _id: ID
    food: Food!
    qty: Int!
  }

  type Query{
    orders: [Order!]
    ordersByRestaurant(restaurantId: ID!, status: String): [Order!]
    orderByUser(userId: ID!): [Order!]
    orderById(orderId: ID!): Order!
  }

  type Mutation{
    createOrder(orderInput: OrderInput!): Order!
    updateOrder(orderId: ID!, status: String!): Order!
    reviewOrder(orderId: ID!, star: Int!, description: String!): Order!
    merchantCancelOrder(orderId: ID!): Order!
  }

  input ItemInput{
    qty:Int!
    food: ID!
  }

  input PaymentInput{
    paymentType: String!
    detail: String!
  }

  input OrderInput{
    restaurant: ID!
    delivery_position: PositionInput!
    user: ID!
    items:[ItemInput!]!
    subtotal: Float!
    total: Float!
    payment: PaymentInput!
  }
`