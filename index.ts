import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupCreate(
      gourpInput: GroupInput!
    ): Group!
    groupDelete(groupId: ID!): Boolean!
    groupUpdate(
      groupId: ID!,
      groupInput: GroupInput!
    ): Group!
    groupPublish(groupId: ID!): Boolean!
    groupUnpublish(groupId: ID!): Boolean!
    groupAddCars(groupId: ID!, carId: ID!): [Car]!
    groupRemoveCars(groupId: ID!, carId: ID!): Boolean!
  }

  input GroupInput {
    name: String, 
    image: ImageInput, 
    description: String, 
    featureSet: GroupFeatureFields
  }

  input ImageInput {
    url: String!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    name: String!
    image: Image
    description: String!
    hasCar(id: ID!): Boolean! 
    cars(skip: Int!, take: Int!): [Car!]!
    groupFeatureSet: GroupFeatureSet      
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatures {
    feature: GroupFeatureFields!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
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
