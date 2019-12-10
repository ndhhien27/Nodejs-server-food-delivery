export default `
  type Restaurant{
    _id: ID!
    cuisines: [String!]!
    name: String!
    position: Position!
    menu_info: [DishType!]
  }

  type Query{
    restaurants: [Restaurant!]!
    restaurantByMerchant(merchantId: ID!): [Restaurant!]
    restaurantById(restaurantId: ID!): Restaurant!
    searchRestaurant(query: String!): [Restaurant!]
  }

  type Mutation{
    createRestaurant(restaurantInput: RestaurantInput!): Restaurant!
  }

  input FoodsInput{
    restaurant: ID
    name: String!
    price: PriceInput!
  }

  input DishTypeNameInput{
    name: String!
    foods: FoodInput
  }

  input RestaurantInput{
    name: String!
    position: PositionInput!
    cuisines: [String!]!
    merchant: ID!
  }
`