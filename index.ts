import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    cars(skip: Int!, take: Int!): [Car!]!
    groupFeatureSet: GroupFeatureSet      
  }

  type GroupFeatures {
    feature: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }
`;

const resolvers = {
  Query: {
    cars: () => [{ id: 1, color: 'blue', make: 'Toyota' }],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
