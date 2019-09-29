require('dotenv').config();
const express = require('express');
import { urlencoded, json } from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'

import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/';
// const verify = require('./middleware/verify');

// const Schema = require('./graphql/types');
// const Resolver = require('./graphql/resolvers');

const app = express();
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ ...req })
});

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())

// app.use(verify)

// app.use(
//   '/graphql',
//   graphqlHttp({
//     schema: schema,
//     graphiql: true
//   }),
// );

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });


mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() =>
    app.listen(8080, () =>
      console.log(`Server ready at http://localhost:8080${server.graphqlPath}`)))
  .catch(err => console.log(err))

// app.listen(5000, () => console.log('Server is listening'));