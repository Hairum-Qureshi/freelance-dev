import { Link, useNavigate } from "react-router-dom";
import freelanceDevLogo from "../assets/freelance-dev-logo.jpeg";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { MdLogout } from "react-icons/md";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function Navbar() {
	const navigate = useNavigate();
	const { data: currUserData } = useCurrentUser();
	const { signOutMutation } = useGoogleAuth();

	return (
		<div className="w-full h-16 bg-slate-100/50 text-black flex items-center px-5">
			<div className="flex items-center">
				<Link to="/" className="flex items-center">
					<img
						src={freelanceDevLogo}
						alt="Freelance Dev Logo"
						className="h-14 w-14 object-cover"
					/>
					<h1 className="font-semibold text-2xl ml-2">Freelance Dev</h1>
				</Link>
			</div>

			<div className="ml-auto flex items-center gap-3">
				<Link to="/about" className="hover:underline">
					About
				</Link>

				<Link to="/contact" className="hover:underline">
					Contact
				</Link>

				<Link to="/services" className="hover:underline">
					Services
				</Link>

				{!currUserData ? (
					<button
						className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 active:bg-gray-900 transition-colors cursor-pointer"
						onClick={() => navigate("/join")}
					>
						Join Now
					</button>
				) : (
					<>
						<button
							className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 active:bg-gray-900 transition-colors cursor-pointer"
							onClick={() => navigate(`/p/${currUserData.id}`)}
						>
							View Profile
						</button>
						<button
							className="flex items-center gap-1.5 text-red-600 px-2 py-1.5 rounded-md hover:text-red-700 active:text-red-800 transition-colors cursor-pointer"
							onClick={() => {
								signOutMutation.mutate();
							}}
						>
							<MdLogout size={18} />
							Logout
						</button>
					</>
				)}
			</div>
		</div>
	);
}
