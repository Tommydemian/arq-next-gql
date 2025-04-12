"use client";
import { useActionState, useEffect, useRef } from "react";
import { login } from "@/features/auth/login-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordVisibility } from "@/features/auth/usePasswordVisibility";
import { EyeIcon } from "lucide-react";

import type { ActionResponse } from "@/types/auth";

const initialState: ActionResponse = {
	success: false,
	message: "",
	errors: undefined,
};
export const LoginFormClient = () => {
	const { handleChange, isVisible } = usePasswordVisibility();
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const [state, formAction, isPending] = useActionState<
		ActionResponse,
		FormData
	>(async (prevState: ActionResponse, formData: FormData) => {
		try {
			const result = await login(formData);

			if (result.success) {
				toast.success("Sign in correctly");
				router.push("/dashboard");
			}
			return result;
		} catch (error) {
			return {
				success: false,
				message: (error as Error).message || "An error ocurred",
				errors: undefined,
			};
		} finally {
			formRef.current?.reset();
		}
	}, initialState);

	useEffect(() => {
		if (!state.success && state.message) {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<form ref={formRef} action={formAction} className="space-y-8">
			<label htmlFor="email">Email</label>
			<Input
				disabled={isPending}
				name="email"
				type="email"
				placeholder="jonhdoe@gmail.com"
			/>
			{state.errors?.email && (
				<p className="text-destructive text-sm">{state.errors.email[0]}</p>
			)}
			<label htmlFor="password">Password</label>
			<div className="relative">
				<Input
					disabled={isPending}
					name="password"
					type={isVisible ? "text" : "password"}
					placeholder="••••••••"
					className="pr-10"
				/>
				<EyeIcon
					className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
					onClick={handleChange}
				/>
			</div>
			{state.errors?.password && (
				<p className="text-destructive text-sm">{state.errors.password[0]}</p>
			)}
			<Button disabled={isPending} type="submit">
				{isPending ? "Loading..." : "Submit"}
			</Button>
			{state.message && <p>{state.message}</p>}
		</form>
	);
};
