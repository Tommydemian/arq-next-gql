import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().trim().email({ message: "Invalid emails addresss." }),
	password: z
		.string()
		.trim()
		.min(6, { message: "Password has to be at least 6 characters long" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
