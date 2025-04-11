import jwt from "jsonwebtoken";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const SECRET = process.env.JWT_SECRET!;

export function verifyJWT(token: string) {
	return jwt.verify(token, SECRET);
}
