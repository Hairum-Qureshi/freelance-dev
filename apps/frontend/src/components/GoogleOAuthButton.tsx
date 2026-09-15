import { useGoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { FaGoogle } from "react-icons/fa";

export default function GoogleOAuthButton() {
	const { googleSignInMutation } = useGoogleAuth();

	const login = useGoogleLogin({
		onSuccess: credentialResponse =>
			googleSignInMutation.mutate(credentialResponse.access_token)
	});

	return (
		<button
			type="button"
			onClick={() => {
				login();
			}}
			className="w-3/4 rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 hover:cursor-pointer"
		>
			<FaGoogle className="inline mr-2" /> Sign in with Google
		</button>
	);
}
