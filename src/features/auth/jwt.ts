import jwt from "jsonwebtoken";
import type { TokenPayload } from "@/types/auth";

// biome-ignore lint/style/noNonNullAssertion: I'm trusting .env to exist in dev.
const JWT_SECRET = process.env.JWT_SECRET!;

export function createJWT(payload: TokenPayload): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJWT(token: string): TokenPayload | null {
	try {
		return jwt.verify(token, JWT_SECRET) as TokenPayload;
	} catch {
		return null;
	}
}
