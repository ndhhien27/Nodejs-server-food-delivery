export default `
  type Restaurant{
    _id: ID!
    cuisines: String!
    name: String!
    position: Position!
    menu_info: [DishType!]
    distance: Float
    rating: Rating!
    createdAt: String!
    updatedAt: String!
    img_url: String!
    bookmarks: Int!
    hasBookmarked: Boolean!
    orders: [Order!]
  }

  type Rating{
    avg: Float!
    total_review: Int!
  }

  type Query{
    restaurants(userLocation: LocationInput!): [Restaurant!]!
    restaurantByMerchant(merchantId: ID!): [Restaurant!]
    restaurantById(restaurantId: ID!): Restaurant!
    searchRestaurant(query: String!): [Restaurant!]
    nearestRestaurants(userLocation: LocationInput!): [Restaurant!]
    restaurantByRating(userLocation: LocationInput!, limit: Int): [Restaurant!]!
  }

  type Mutation{
    createRestaurant(restaurantInput: RestaurantInput!): Restaurant!
  }

  input LocationInput{
    address: String
    lat: Float!
    long: Float!
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
    cuisines: String!
    merchant: ID!
  }
`