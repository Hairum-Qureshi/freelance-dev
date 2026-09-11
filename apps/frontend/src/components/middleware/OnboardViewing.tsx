import { useCurrentUser } from "../../hooks/useCurrentUser";
import NotFound from "../../pages/NotFound";

export default function OnboardViewing({
	children
}: {
	children: React.ReactNode;
}) {
	const { data: currUserData } = useCurrentUser();

	return !currUserData?.onboardingAnswers ? children : <NotFound />;
}
