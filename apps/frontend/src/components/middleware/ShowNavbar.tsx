import React from "react";
import { useLocation } from "react-router-dom";

export default function ShowNavbar({
	children
}: {
	children: React.ReactNode;
}) {
	const location = useLocation();

	return location.pathname !== "/join" ? <>{children}</> : null;
}
