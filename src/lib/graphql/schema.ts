import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }

  type Appointment {
    id: ID!
    title: String!
    date: String!
    userId: ID!
  }

  input CreateUserInput {
    email: String!
    name: String
  }

  input CreateAppointmentInput {
    title: String!
    date: String!
    userId: ID!
  }

  type Query {
    getUsers: [User!]!
    getAppointments: [Appointment!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createAppointment(input: CreateAppointmentInput!): Appointment
  }

  type AuthPayload {
  token: String!
  user: User!
}

type Mutation {
  signup(email: String!, password: String!, name: String): AuthPayload
  login(email: String!, password: String!): AuthPayload
}

input SignupInput {
	email: String!
	password: String!
	name: String
	tenantId: String!
}

input LoginInput {
	email: String!
	password: String!
}

type AuthPayload {
	token: String!
	user: User!
}

type Mutation {
	signup(input: SignupInput!): AuthPayload
	login(input: LoginInput!): AuthPayload
	logout: Boolean
}


  
`;
