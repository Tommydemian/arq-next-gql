"use server";

import { cookies } from "next/headers";
import { authService } from "@/lib/services/authService";
import type { ActionResponse } from "./types";
import { LoginSchema, type LoginInput } from "./zod-schema";

export async function login(formData: FormData): Promise<ActionResponse> {
	// const setUser = useUserStore((u) => u.setUser);

	try {
		const input: LoginInput = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		// ✅ Validate the form input (not the result)
		const validationResult = LoginSchema.safeParse(input);
		if (!validationResult.success) {
			return {
				success: false,
				message: "Validation failed",
				errors: validationResult.error.flatten().fieldErrors,
				user: null,
			};
		}

		// ✅ Authenticate user (includes password check and token creation)
		const auth = authService.login(input);
		if (!auth) {
			return {
				success: false,
				message: "Invalid email or password",
				errors: {
					email: ["Invalid email or password"],
				},
				user: null,
			};
		}

		// ✅ Set JWT in cookie
		const cookie = await cookies();
		cookie.set("auth_token", auth.token, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 7 days
		});

		return {
			success: true,
			message: "Logged in successfully",
			user: auth.user,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "Something bad happened",
			user: null,
		};
	}
}
