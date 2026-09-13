import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import freelanceDevLogo from "../assets/freelance-dev-logo.svg";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { MdLogout, MdPerson } from "react-icons/md";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { FaCircleUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [openNotificationsDropdown, setOpenNotificationsDropdown] =
		useState(false);

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

				<Link to="/listings" className="hover:underline">
					Listings
				</Link>

				{currUserData?.onboardingAnswers.role === "Hire" && (
					<Link to="/post-job" className="hover:underline">
						Post a Job
					</Link>
				)}

				{currUserData && (
					<div className="relative">
						<button
							className="relative p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-200/70 active:bg-gray-300 transition-all duration-150 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black/10"
							aria-label="Notifications"
							onClick={() => setOpenNotificationsDropdown(prev => !prev)}
						>
							<FaBell size={18} />
							<span className="absolute top-1.5 right-1.5 flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white"></span>
							</span>
						</button>
						{openNotificationsDropdown && (
							<>
								<div
									className="fixed inset-0 z-40"
									onClick={() => setOpenNotificationsDropdown(false)}
								/>
								<div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200/80 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-gray-100 animate-in fade-in zoom-in-95 duration-100">
									<div className="px-4 py-3 bg-gray-50/70 flex items-center justify-between">
										<h3 className="text-sm font-semibold text-gray-900">
											Notifications
										</h3>
										<span className="text-xs text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded-full font-medium">
											0 new
										</span>
									</div>
									<div className="py-8 px-4 text-center">
										<div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
											<FaBell size={18} />
										</div>
										<p className="text-sm font-medium text-gray-700">
											No new notifications
										</p>
										<p className="text-xs text-gray-500 mt-0.5">
											We'll let you know when something arrives!
										</p>
									</div>
								</div>
							</>
						)}
					</div>
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
