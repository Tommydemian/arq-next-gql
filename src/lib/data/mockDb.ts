export type User = {
	id: string;
	email: string;
	password: string;
	role: string;
};

export const users: User[] = [
	{
		id: "123",
		email: "tomas@demo.com",
		password: "123456",
		role: "manager",
	},
];
