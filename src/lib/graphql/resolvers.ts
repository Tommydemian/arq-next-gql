import { db } from "../db";

export const resolvers = {
	Query: {
		getUsers: () => {
			const stmt = db.prepare("SELECT * FROM users");
			return stmt.all();
		},
	},
	Mutation: {
		createUser: (_: any, args: { email: string; name?: string }) => {
			const stmt = db.prepare("INSERT INTO users (email, name) VALUES (?, ?)");
			const info = stmt.run(args.email, args.name);
			return {
				id: info.lastInsertRowid,
				email: args.email,
				name: args.name,
			};
		},
	},
};
