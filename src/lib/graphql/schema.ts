import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    createUser(email: String!, name: String): User
  }
`;
