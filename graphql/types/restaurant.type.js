export default `  
  type DishTypeName{
    _id: ID
    name: String!
    foods: [Food!]
  }

  type Address{
    address_1: String!
    district: String!
    city: String!
  }

  type Restaurant{
    _id: ID!
    cuisines: [String!]!
    name: String!
    address: Address!
    menu_info: [DishTypeName!]
  }

  type Query{
    restaurants: [Restaurant!]!
    restaurantByMerchant(merchantId: ID!): [Restaurant!]
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
  
  input AddressInput{
    address_1: String!
    district: String!
    city: String!
  }

  input RestaurantInput{
    name: String!
    address: AddressInput!
    cuisines: [String!]!
    merchant: ID!
  }
`