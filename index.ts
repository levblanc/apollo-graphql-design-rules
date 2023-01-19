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

  type ManualGroup {
    Image
    [GroupMembership]
  }

  type AutomaticGroup {
    Image
    [GroupMembership]
    [AutomaticGroupFeatures]
  }

  type AutomaticGroupFeatures {}

  type GroupMembership {
    Group
    Car
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
