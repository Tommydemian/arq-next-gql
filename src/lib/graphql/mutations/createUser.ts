import { gql } from "@apollo/client";
import { getClient } from "../apolloClient"; // assuming this is correct path

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String) {
    createUser(email: $email, name: $name) {
      id
      email
      name
    }
  }
`;

export async function createUser(email: string, name?: string) {
	const client = getClient();

	const { data } = await client.mutate({
		mutation: CREATE_USER,
		variables: { email, name },
	});

	return data.createUser;
}
