import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().trim().email({ message: "Invalid email address." }).min(1),
	password: z
		.string()
		.min(6, { message: "Email has to be at least 6 characters long." }),
});

export type SigninInput = z.infer<typeof signInSchema>;
