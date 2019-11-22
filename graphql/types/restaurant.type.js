export default `
  type Restaurant{
    _id: ID!
    cuisines: [String!]!
    name: String!
    address: String!
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

  input PriceInput{
    text: String!
    unit: String!
    value: Float!
  }

  input DishTypeNameInput{
    name: String!
    foods: FoodInput
  }

  input RestaurantInput{
    name: String!
    address: String!
    cuisines: [String!]!
    merchant: ID!
  }
`