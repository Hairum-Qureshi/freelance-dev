export default function ChatHeader({
	profilePicture,
	name,
	title
}: {
	profilePicture: string;
	name: string;
	title: string;
}) {
	return (
		<div className="border-b border-slate-200 p-3 flex items-center h-[65px] shrink-0">
			<img
				src={profilePicture}
				alt="Message"
				referrerPolicy="no-referrer"
				className="h-10 w-10 rounded-full object-cover border-2 border-slate-200"
			/>
			<div className="ml-3">
				<p className="font-semibold text-base leading-tight">{name}</p>
				<p className="text-sm text-gray-500">{title}</p>
			</div>
		</div>
	);
}
