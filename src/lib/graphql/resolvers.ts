import { userService } from "../services/userService";
import { appointmentService } from "../services/appointmentService";
import { authService } from "../services/authService";

import type { SignupInput, LoginInput } from "@/types/auth";

export const resolvers = {
	Query: {
		getUsers: (_: any, __: any, context: { user: { tenantId: string } }) => {
			return userService.listUsers(context.user.tenantId);
		},
		getAppointments: (
			_: any,
			__: any,
			context: { user: { tenantId: string } },
		) => {
			return appointmentService.listAppointments(context.user.tenantId);
		},
	},

	Mutation: {
		signup: (_: any, { input }: { input: SignupInput }) => {
			return authService.signup(input);
		},

		login: (_: any, { input }: { input: LoginInput }) => {
			const payload = authService.login(input);
			if (!payload) {
				throw new Error("Invalid credentials");
			}
			return payload;
		},

		logout: () => {
			// JWT-based logout is client-side (delete token/cookie)
			return true;
		},

		createUser: (
			_: any,
			{ input }: { input: { email: string; name: string } },
			context: { user: { tenantId: string } },
		) => {
			return userService.registerUser({
				email: input.email,
				name: input.name,
				tenantId: context.user.tenantId,
			});
		},
	},
};
