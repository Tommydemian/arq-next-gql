import { db } from "../db";
import bcrypt from "bcryptjs";
import type { DbUser } from "@/types/auth";

export const userModel = {
	getAll: () => db.prepare("SELECT * FROM users").all(),

	createUser: (
		email: string,
		password: string,
		tenantId: string,
		role = "user",
	) => {
		const hashed = bcrypt.hashSync(password, 10);
		const stmt = db.prepare(
			"INSERT INTO users (email, password, role, tenantId) VALUES (?, ?, ?, ?)",
		);
		const result = stmt.run(email, hashed, role, tenantId);
		return { id: Number(result.lastInsertRowid), email, role, tenantId };
	},

	getAllByTenant: (tenantId: string): DbUser[] => {
		const stmt = db.prepare("SELECT * FROM users WHERE tenantId = ?");
		return stmt.all(tenantId) as DbUser[];
	},
	getByEmail: (email: string): DbUser | null => {
		const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
		const user = stmt.get(email) as DbUser | undefined;
		return user ?? null;
	},
	loginUser(email: string, password: string): DbUser | null {
		const user = userModel.getByEmail(email);
		if (!user) return null;

		// const isPasswordValid = bcrypt.compareSync(password, user.password);
		// if (!isPasswordValid) return null;
		if (user.password !== password) return null; // 🔥 Plaintext check

		return user;
	},
};
