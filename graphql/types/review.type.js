export default `
  type Review{
    user: User
    star: Int
    description: String
  }

  type Query{
    reviewsByRestaurant(restaurantId: ID!): [Review!]
  }
`