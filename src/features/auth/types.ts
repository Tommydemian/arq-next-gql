export type ActionResponse = {
	success: boolean;
	message: string;
	errors?: Record<string, string[]>;
	error?: string;
};

export type DbUser = {
	id: number;
	email: string;
	password: string;
	role: string;
	tenantId: string;
	name?: string;
};

export type TokenPayload = {
	id: number;
	email: string;
	role: string;
	tenantId: string;
};

export type SignupInput = {
	email: string;
	password: string;
	name?: string;
	tenantId: string;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type AuthPayload = {
	token: string;
	user: Omit<DbUser, "password">;
};
