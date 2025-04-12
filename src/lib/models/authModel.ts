// src/models/authModel.ts

import { db } from "../db";
import bcrypt from "bcryptjs";
import type { DbUser } from "@/types/auth";

export const authModel = {
	createUser: (
		email: string,
		password: string,
		tenantId: string,
		role = "user",
	): DbUser => {
		const hashed = bcrypt.hashSync(password, 10);

		const stmt = db.prepare(
			"INSERT INTO users (email, password, role, tenantId) VALUES (?, ?, ?, ?)",
		);

		const result = stmt.run(email, hashed, role, tenantId);

		return {
			id: Number(result.lastInsertRowid),
			email,
			password: hashed,
			role,
			tenantId,
		};
	},
};
