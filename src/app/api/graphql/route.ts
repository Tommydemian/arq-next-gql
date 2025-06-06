import type { NextRequest } from "next/server";
import { typeDefs } from "@/lib/graphql/schema";
import { resolvers } from "@/lib/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { ApolloServer } from "@apollo/server";

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => {
		const user = getUserFromRequest(req);
		return { user };
	},
});
export { handler as GET, handler as POST };

import { getUserFromRequest } from "@/auth/session";
