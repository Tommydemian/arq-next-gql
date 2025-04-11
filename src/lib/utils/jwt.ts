import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms"; // 👈 this is the secret sauce

const SECRET: Secret = process.env.JWT_SECRET || "super-secret-key";

export function createJWT(payload: object, expiresIn: StringValue = "7d") {
	const options: SignOptions = { expiresIn };
	return jwt.sign(payload, SECRET, options);
}

export function verifyJWT(token: string) {
	try {
		return jwt.verify(token, SECRET);
	} catch (err) {
		return null;
	}
}
