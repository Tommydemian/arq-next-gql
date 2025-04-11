import { HttpLink } from "@apollo/client";
import {
	registerApolloClient,
	ApolloClient,
	InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri:
				typeof window === "undefined"
					? "http://localhost:3000/api/graphql"
					: "/api/graphql",
		}),
	});
});
