import { appointmentModel } from "../models/appointmentModel";
import { db } from "../db";

export const appointmentService = {
	createAppointment: (title: string, date: string, userId: string) => {
		return appointmentModel.create(title, date, userId);
	},

	listAppointments: (tenantId: string) => {
		return db
			.prepare("SELECT * FROM appointments WHERE tenantId = ?")
			.all(tenantId);
	},
};
