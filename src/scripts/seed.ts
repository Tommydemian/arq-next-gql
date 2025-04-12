// src/scripts/seed.ts

import { db } from "../lib/db.js"; // 👈 use `.js` extension in ESM

import bcrypt from "bcryptjs";

function seedUser(
	email: string,
	name: string,
	password: string,
	role: string,
	tenantId: string,
) {
	const hashed = bcrypt.hashSync(password, 10);
	db.prepare(`
    INSERT OR IGNORE INTO users (email, password, name, role, tenantId)
    VALUES (?, ?, ?, ?, ?)
  `).run(email, hashed, name, role, tenantId);
}

seedUser("admin@acme.com", "Acme Admin", "password", "admin", "acme");
seedUser("user@globex.com", "Globex Guy", "password", "user", "globex");

console.log("✅ Seed complete");
