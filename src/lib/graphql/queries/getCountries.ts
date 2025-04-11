// lib/graphql/queries/getCountries.ts
import { gql } from "@apollo/client";
import { getClient } from "../apolloClient";

const GET_COUNTRIES = gql`
	query GetCountries {
		countries {
			code
			name
			emoji
		}
	}
`;

export async function getCountries() {
	const client = getClient();
	const { data } = await client.query({ query: GET_COUNTRIES });

	return data.countries;
}
