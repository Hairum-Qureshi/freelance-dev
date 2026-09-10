import { useGoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { FaGoogle } from "react-icons/fa";

export default function GoogleOAuthButton() {
	const { googleSignInMutation } = useGoogleAuth();

	const login = useGoogleLogin({
		onSuccess: tokenResponse => googleSignInMutation(tokenResponse.access_token)
	});

	return (
		<button
			onClick={() => {
				login();
			}}
			className="w-1/2 rounded-lg bg-black px-4 py-3 font-medium text-white transition"
		>
			<FaGoogle className="inline mr-2" />
			Sign in with Google
		</button>
	);
}
