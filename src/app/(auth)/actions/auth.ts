"use server";

import { createJWT } from "@/lib/utils/jwt";
import { signInSchema } from "@/lib/schemas/auth";
import { cookies } from "next/headers";
import { mockDelay } from "@/lib/utils/mockDelay";
import type { ActionResponse } from "@/types/auth";
import { users, type User } from "@/lib/data/mockDb";
import { redirect } from "next/navigation";

export async function loginUser(email: string, password: string) {
	// Aquí simularías el login real (llamada a tu backend o GQL)
	const user = { id: "123", role: "manager", email };
	const token = createJWT(user);

	// Guardamos el JWT en cookie httpOnly
	const cookieStore = await cookies();
	cookieStore.set("token", token, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
	});

	return { success: true };
}

export const signin = async (formData: FormData): Promise<ActionResponse> => {
	await mockDelay(3000);
	try {
		const data = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const validationResult = signInSchema.safeParse(data);

		if (!validationResult.success) {
			return {
				success: false,
				message: "Validation failed",
				errors: validationResult.error.flatten().fieldErrors,
			};
		}

		const { email, password } = validationResult.data;

		const user = await getUserByEmail(email);

		if (!user || user.password !== password) {
			return {
				success: false,
				message: "Invalid credentials",
			};
		}

		await loginUser(user.email, password);

		return {
			success: true,
			message: "Signed in succesfully",
		};
	} catch (error) {
		console.error("Signin error:", error);
		return {
			success: false,
			message: "Something went wrong",
		};
	}
};

export const signup = async (formData: FormData): Promise<ActionResponse> => {
	await mockDelay(3000);

	try {
		const data = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const validationResult = signInSchema.safeParse(data);

		if (!validationResult.success) {
			return {
				success: false,
				message: "Validation failed",
				errors: validationResult.error.flatten().fieldErrors,
			};
		}

		const { email, password } = validationResult.data;

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return {
				success: false,
				message: "User already exists",
			};
		}

		const newUser = {
			id: crypto.randomUUID(),
			email,
			password,
			role: "patient",
		};

		users.push(newUser);

		// Log them in immediately after signup
		const token = createJWT(newUser);

		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
		});

		return {
			success: true,
			message: "Account created successfully",
		};
	} catch (error) {
		console.error("Signup error:", error);
		return {
			success: false,
			message: "Something went wrong",
		};
	}
};

export async function getUserByEmail(email: string): Promise<User | null> {
	return users.find((u) => u.email === email) || null;
}

export async function logout() {
	const cookieStore = await cookies();

	// Delete the token by setting maxAge to 0
	cookieStore.set("token", "", {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});

	// Redirect after logout
	redirect("/signin");
}
