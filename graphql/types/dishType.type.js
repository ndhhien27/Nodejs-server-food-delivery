export default `
type DishType{
  name: String!
  foods: Food
}

type Mutation{
  createDishType(dishTypeInput: DishTypeInput!): Restaurant!
}

input DishTypeInput{
  restaurant: ID!
  name: String!
}
`