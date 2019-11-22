export default `
type DishType{
  _id: ID!
  restaurant: Restaurant!
  name: String!
  foods: [Food!]
}

type Query{
  menuByRestaurant(restaurantId: ID!): [DishType!]!
}

type Mutation{
  createDishType(dishTypeInput: DishTypeInput!): DishType!
}

input DishTypeInput{
  restaurant: ID!
  name: String!
}
`