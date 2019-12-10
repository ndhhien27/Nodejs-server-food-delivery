export default `
  type Price{
    unit: String!
    value: Float!
  }

  type Food{
    _id: ID!
    name: String!
    img_uri: String!
    total_order: Int!
    restaurant: Restaurant!
    dishType: DishType!
    is_active: Boolean!
    createdAt: String!
    updatedAt: String!
    price: Price!
  }

  type Query{
    foodsByRestaurant(restaurantId: ID!): [Food!]!
  }

  type Mutation{
    createFood(foodInput: FoodInput!): Food!
    deleteFood(foodId: ID!): Food!
    updateFood(foodId: ID!, updateValue: UpdateInput!): Food!
  }

  input PriceInput{
    unit: String!
    value: Float!
  }


  input UpdateInput{
    name: String
    price: PriceInput
    dishType: ID
  }

  input FoodInput{
    restaurant: ID!
    name: String!
    price: PriceInput!
    dishType: ID!
  }
`