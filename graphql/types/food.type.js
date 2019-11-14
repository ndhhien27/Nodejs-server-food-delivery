export default `
  type Price{
    text: String!
    unit: String!
    value: Float!
  }

  type Food{
    _id: ID!
    name: String!
    img_uri: String!
    total_order: Int!
    restaurant: ID!
    is_available: Boolean!
    createdAt: String!
    updatedAt: String!
    price: Price!
  }

  type Mutation{
    createFood(foodInput: FoodInput!): Food!
  }

  input PriceInput{
    text: String!
    unit: String!
    value: Float!
  }

  input FoodInput{
    restaurant: ID!
    name: String!
    price: PriceInput!
    dishType: String!
  }
`