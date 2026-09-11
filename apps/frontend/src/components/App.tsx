import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowNavbar from "./middleware/ShowNavbar";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import "../css/index.css";
import Join from "../pages/Join";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ShowFooter from "./middleware/ShowFooter";
import Onboarding from "../pages/Onboarding";
import OnboardViewing from "./middleware/OnboardViewing";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

export default function App() {
	return (
		<BrowserRouter>
			<ShowNavbar>
				<Navbar />
			</ShowNavbar>
			<GoogleOAuthProvider
				clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/join" element={<Join />} />
					<Route path="/p/:uid" element={<Profile />} />
					<Route path="/p/:uid/settings" element={<Settings />} />

					<Route
						path="/onboarding"
						element={
							<OnboardViewing>
								<Onboarding />
							</OnboardViewing>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</GoogleOAuthProvider>
			<ShowFooter>
				<Footer />
			</ShowFooter>
		</BrowserRouter>
	);
}
