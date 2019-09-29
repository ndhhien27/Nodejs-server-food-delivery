export default `
  type Category{
    _id: ID!
    title: String!
    is_active: String
    createdAt: String!
    updatedAt: String!
  }

  type Query{
    categories: [Category!]!
  }

  type Mutation{
    createCategory(category: CategoryInput!): Category!
  }

  input CategoryInput{
    title: String!
  }
`