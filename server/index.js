// import express from "express";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
// import bodyParser from "body-parser";

// const PORT = 4000;
// const server = express();

// const typeDefs = `type Channel {
//   id: ID!
//   name: String
// }

// type Query {
//   channels: [Channel]
// }
// `;

// const channels = [
//   {
//     id: 1,
//     name: "soccer",
//   },
//   {
//     id: 2,
//     name: "baseball",
//   },
// ];

// export const resolvers = {
//   Query: {
//     channels: () => {
//       return channels;
//     },
//   },
// };

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// server.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

import express from "express";
import { graphqlHTTP } from "express-graphql";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema.js";
import cors from "cors";

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // playground: true,
});

await server.start();
server.applyMiddleware({ app });

// app.get("/", (req, res) => {
//   res.send({ hello: "there!" });
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}/graphql`));
