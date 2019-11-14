export default `  
  type DishTypeName{
    _id: ID
    name: String!
    foods: [Food!]
  }

  type Restaurant{
    _id: ID!
    name: String!
    address: String!
    menu_info: [DishTypeName!]
  }

  type Query{
    restaurants: [Restaurant!]!
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
  }
`