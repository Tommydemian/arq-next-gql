import { useState, useCallback } from "react";
export const usePasswordVisibility = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleChange = useCallback(() => {
		setIsVisible((prev) => !prev);
	}, []);

	return {
		isVisible,
		handleChange,
	};
};
