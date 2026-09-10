import { Link, useNavigate } from "react-router-dom";
import freelanceDevLogo from "../assets/freelance-dev-logo.jpeg";

export default function Navbar() {
	const navigate = useNavigate();

	return (
		<div className="w-full h-16 bg-slate-100/50 text-black flex items-center px-5">
			<div className="flex items-center">
				<img
					src={freelanceDevLogo}
					alt="Freelance Dev Logo"
					className="h-22 w-22 object-cover"
				/>
				<h1 className="font-semibold text-2xl">Freelance Dev</h1>
			</div>
			<div className="ml-auto space-x-3">
				<Link to="/about" className="hover:underline">
					About
				</Link>
				<Link to="/contact" className="hover:underline">
					Contact
				</Link>
				<Link to="/services" className="hover:underline">
					Services
				</Link>
				<button
					className="bg-black text-white px-3 py-1.5 rounded-md hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900"
					onClick={() => navigate("/join")}
				>
					Join Now
				</button>
			</div>
		</div>
	);
}
