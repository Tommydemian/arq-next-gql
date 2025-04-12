import { create } from "zustand";
import type { PublicUser } from "./types";

type UserStore = {
	user: PublicUser | null;
	setUser: (user: PublicUser) => void;
};

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	clearUSer: () => set({ user: null }),
}));
