"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { ActionResponse } from "@/types/auth";
import type { FC, FormHTMLAttributes, RefObject } from "react";

type RegistrationFormProps = FormHTMLAttributes<HTMLFormElement> & {
	isPending: boolean;
	state: ActionResponse;
	formRef: RefObject<HTMLFormElement | null>;
};

export const RegistrationForm: FC<RegistrationFormProps> = ({
	isPending,
	state,
	formRef,
	...props
}) => {
	return (
		<form ref={formRef} {...props} className="space-y-8">
			<div className="grid gap-2">
				<label htmlFor="email">Email</label>
				<Input
					disabled={isPending}
					name="email"
					type="email"
					placeholder="email"
				/>
				<p className="text-sm text-muted-foreground">Your email address.</p>
				{state.errors?.email && (
					<p className="text-destructive text-sm">{state.errors.email[0]}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="password">Password</label>
				<Input
					disabled={isPending}
					name="password"
					type="password"
					placeholder="password"
				/>
				<p className="text-sm text-muted-foreground">Your password.</p>
				{state.errors?.password && (
					<p className="text-destructive text-sm">{state.errors.password[0]}</p>
				)}
			</div>

			<Button type="submit" disabled={isPending}>
				{isPending ? "Loading..." : "Submit"}
			</Button>

			{state.message && <p>{state.message}</p>}
		</form>
	);
};
