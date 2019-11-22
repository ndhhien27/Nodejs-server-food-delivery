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
    restaurant: Restaurant!
    dish_type: DishType!
    is_available: Boolean!
    createdAt: String!
    updatedAt: String!
    price: Price!
  }

  type Query{
    foodsByRestaurant(restaurantId: ID!): [Food!]!
  }

  type Mutation{
    createFood(foodInput: FoodInput!): [Food!]!
  }

  input PriceInput{
    text: String!
    unit: String!
    value: Float!
  }

  input DetailInput{
    name: String!
    price: PriceInput!
  }

  input FoodInput{
    restaurant: ID!
    detail: [DetailInput!]!
    dishType: ID!
  }
`