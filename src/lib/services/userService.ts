import { userModel } from "../models/userModel";
import type { DbUser, SignupInput } from "@/types/auth";
import { authModel } from "../models/authModel";
import bcrypt from "bcryptjs";

type RegisterUserArgs = {
	email: string;
	name: string;
	tenantId: string;
};

type PublicUser = Omit<DbUser, "password">;

export const userService = {
	registerUser: ({ email, password, tenantId }: SignupInput): DbUser => {
		// You could add a duplicate check here if you want
		return authModel.createUser(email, password, tenantId, "user");
	},
	listUsers: (tenantId: string): DbUser[] => {
		return userModel.getAllByTenant(tenantId);
	},
	getUserByEmail: (email: string): DbUser | null => {
		return userModel.getByEmail(email);
	},
	loginUser: (email: string, password: string): DbUser | null => {
		const user = userModel.getByEmail(email);
		if (!user) return null;

		// const isPasswordValid = bcrypt.compareSync(password, user.password);
		// if (!isPasswordValid) return null;
		if (user.password !== password) return null;

		return user;
	},
};
