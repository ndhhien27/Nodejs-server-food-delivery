export default `
  type Food{
    _id: ID!
    title: String!
    likes: Int!
    category: Category!
    img_uri: String!
    is_active: Boolean!
    createdAt: String!
    updatedAt: String!
    price: Float!
  }

  type Query{
    foods: [Food!]!
    likedFood: [Food!]!
    foodByCategory(categoryId: ID!): [Food!]!
  }

  type Mutation{
    createFood(food: FoodInput!): Food!
  }

  input FoodInput{
    title: String!
    price: Float!
    category: ID!
  }
`