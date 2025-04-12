import { verifyJWT } from "./jwt";
import type { TokenPayload } from "@/types/auth";

export function getUserFromRequest(req: Request): TokenPayload | null {
	const auth = req.headers.get("authorization");
	if (!auth?.startsWith("Bearer ")) return null;
	const token = auth.replace("Bearer ", "");
	return verifyJWT(token);
}
