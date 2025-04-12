import { authModel } from "../models/authModel";
import { userService } from "./userService";
import { createJWT } from "@/features/auth/jwt";
import type { LoginInput, SignupInput, AuthPayload } from "@/types/auth";

export const authService = {
	signup: (input: SignupInput): AuthPayload => {
		const user = userService.registerUser(input);

		const token = createJWT({
			id: user.id,
			email: user.email,
			role: user.role,
			tenantId: user.tenantId,
		});

		const { password, ...safeUser } = user;
		return { token, user: safeUser };
	},
	// authService.ts
	login: (input: LoginInput): AuthPayload | null => {
		const user = userService.loginUser(input.email, input.password);
		if (!user) return null;

		const token = createJWT({
			id: user.id,
			email: user.email,
			role: user.role,
			tenantId: user.tenantId,
		});

		const { password, ...safeUser } = user;
		return { token, user: safeUser };
	},
};
