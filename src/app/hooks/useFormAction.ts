import { useRouter } from "next/navigation";
import { useEffect, useRef, useActionState } from "react";
import { toast } from "sonner";
import type { ActionResponse } from "@/types/auth";

type FormActionConfig = {
	actionCallback: (formData: FormData) => Promise<ActionResponse>;
	successMessage: string;
	onSuccessPushDirection: string;
};

const initialState = {
	success: false,
	message: "",
	errors: {},
};
export const useFormAction = ({
	actionCallback,
	successMessage = "Operation Succesfull!",
	onSuccessPushDirection = "/dashboard",
}: FormActionConfig) => {
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const [state, formAction, isPending] = useActionState<
		ActionResponse,
		FormData
	>(async (prevState: ActionResponse, formData: FormData) => {
		try {
			const result = await actionCallback(formData);

			if (result.success) {
				toast.success(successMessage);
				// setTimeout(() => router.push("/dashboard"), 1000);
				router.push(onSuccessPushDirection);
				formRef.current?.reset();
			}
			return result;
		} catch (error) {
			return {
				success: false,
				message: (error as Error).message || "An error occurred",
				errors: undefined,
			};
		}
	}, initialState);

	useEffect(() => {
		if (!state.success && state.message) {
			toast.error(state.message);
		}
	}, [state]);

	return {
		state,
		formAction,
		isPending,
		formRef,
	};
};
