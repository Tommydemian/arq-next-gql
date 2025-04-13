import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";
import type { TokenPayload } from "./types";
import { mockDelay } from "@/lib/utils/mockDelay";

export async function getCurrentUser(): Promise<TokenPayload | null> {
	await mockDelay(1000);
	const cookie = await cookies();
	const token = cookie.get("auth_token")?.value;
	if (!token) return null;

	const user = verifyJWT(token);
	return user ?? null;
}
