import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "../pages/Contact";
import PostJob from "../pages/PostJob";
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
import Inbox from "../pages/Inbox";
import Listings from "../pages/Listings";
import Listing from "../pages/Listing";
import TermsOfService from "../pages/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy";

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
					<Route path="/post-job" element={<PostJob />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/inbox" element={<Inbox />} />
					<Route path="/inbox/c/:chatID" element={<Inbox />} />
					<Route path="/listings" element={<Listings />} />
					<Route path="/listing/:jobID" element={<Listing />} />
					<Route path="/privacy-policy" element={<PrivacyPolicy />} />
					<Route path="/terms-of-service" element={<TermsOfService />} />
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
