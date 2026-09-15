import React from "react";
import { useLocation } from "react-router-dom";

export default function ShowFooter({
	children
}: {
	children: React.ReactNode;
}) {
	const location = useLocation();
	const isFocusedPage =
		location.pathname === "/inbox" || location.pathname.startsWith("/p/");

	return location.pathname !== "/join" &&
		location.pathname !== "/onboarding" &&
		!isFocusedPage ? (
		<>{children}</>
	) : null;
}
