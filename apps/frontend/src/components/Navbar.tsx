import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import freelanceDevLogo from "../assets/freelance-dev-logo.svg";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { MdLogout, MdPerson } from "react-icons/md";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { FaCircleUser } from "react-icons/fa6";

export default function Navbar() {
	const [openDropdown, setOpenDropdown] = useState(false);

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
						className="h-25 w-20 object-cover"
					/>
					<h1 className="font-semibold text-2xl">Freelance Dev</h1>
				</Link>
			</div>

			<div className="ml-auto flex items-center gap-3">
				<Link to="/about" className="hover:underline">
					About
				</Link>

				<Link to="/contact" className="hover:underline">
					Contact
				</Link>

				<Link to="/inbox" className="hover:underline">
					Inbox
				</Link>

				{currUserData?.onboardingAnswers.role === "Hire" && (
					<Link to="/post-job" className="hover:underline">
						Post a Job
					</Link>
				)}

				{!currUserData ? (
					<button
						className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 active:bg-gray-900 transition-colors cursor-pointer"
						onClick={() => navigate("/join")}
					>
						Join Now
					</button>
				) : (
					<div className="relative">
						<button
							className="flex items-center gap-1.5 text-black px-2 py-1.5 rounded-md hover:bg-gray-200 active:bg-gray-300 transition-colors cursor-pointer"
							onClick={() => setOpenDropdown(prev => !prev)}
						>
							<FaCircleUser size={24} />
							<span>
								{currUserData.firstName} {currUserData.lastName}
							</span>
						</button>
						{openDropdown && (
							<>
								<div
									className="fixed inset-0 z-40"
									onClick={() => setOpenDropdown(false)}
								/>
								<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
									<button
										className="w-full text-left px-3 py-2 hover:bg-gray-100 hover:cursor-pointer"
										onClick={() => {
											navigate(`/p/${currUserData.id}`);
											setOpenDropdown(false);
										}}
									>
										<MdPerson size={22} className="inline mr-2" />
										View Profile
									</button>
									<button
										className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 hover:cursor-pointer"
										onClick={() => {
											signOutMutation.mutate();
											setOpenDropdown(false);
										}}
									>
										<MdLogout size={18} className="inline mr-2" />
										Logout
									</button>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
