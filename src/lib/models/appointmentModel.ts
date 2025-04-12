import { db } from "../db";

export const appointmentModel = {
	getAll: () => db.prepare("SELECT * FROM appointments").all(),

	create: (title: string, date: string, userId: string) => {
		const stmt = db.prepare(
			"INSERT INTO appointments (title, date, userId) VALUES (?, ?, ?)",
		);
		const result = stmt.run(title, date, userId);
		return {
			id: result.lastInsertRowid,
			title,
			date,
			userId,
		};
	},
};
