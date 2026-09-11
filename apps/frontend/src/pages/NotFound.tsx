import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="h-screen flex items-center justify-center flex-col">
			<h1 className="text-2xl font-bold">404 - Page Not Found</h1>
			<p className="text-lg mt-4">
				The page you are looking for does not exist.
			</p>
			<Link
				to="/"
				className="mt-4 text-blue-500 hover:underline flex items-center"
			>
				<FaArrowLeftLong className="mr-2" />
				Go back to Home
			</Link>
		</div>
	);
}
