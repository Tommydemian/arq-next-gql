// lib/auth/getCurrentUser.ts
import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";

type JWTUserPayload = {
	id: string;
	email: string;
	role: string;
};

export async function getCurrentUser(): Promise<JWTUserPayload | null> {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) return null;

		const user = verifyJWT(token) as JWTUserPayload;

		return user;
	} catch (error) {
		console.error("Invalid or missing JWT:", error);
		return null;
	}
}
