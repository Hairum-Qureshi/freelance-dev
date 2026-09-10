import Header from "../components/home-page/Header";
import Body from "../components/home-page/Body";

export default function Home() {
	return (
		<div className="w-full min-h-screen max-h-auto bg-slate-100/50 p-3">
			<Header />
			<Body />
		</div>
	);
}
