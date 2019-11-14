export default `
  type Order{
    _id: ID!
    user: User!
    items: [Item!]!
    delivery_address: String!
    restaurant: Restaurant!
  }

  type Item{
    _id: ID
    food: Food!
    qty: Int!
  }

  type Query{
    orders: [Order!]!
    ordersOfRestaurant(restaurantId: ID!): [Order!]
  }

  type Mutation{
    createOrder(orderInput: OrderInput!): Order!
  }

  input ItemInput{
    qty:Int!
    food: ID!
  }

  input OrderInput{
    restaurant: ID!
    delivery_address: String!
    user: ID!
    items:[ItemInput!]!
  }
`