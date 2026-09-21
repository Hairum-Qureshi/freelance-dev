import type { Participant } from "@repo/shared-types";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Link } from "react-router-dom";

export default function InboxUserCard({
	selected,
	chatId,
	participants
}: {
	selected: boolean;
	chatId: string;
	participants: { user: Participant }[];
}) {
	const { data: currUser } = useCurrentUser();

	const participant = participants.find(
		p => p.user.id !== currUser?.id && p.user.id !== "1"
	)?.user;

	return (
		<Link to={`/inbox/c/${chatId}`}>
			<div
				className={`p-3 border-t border-b border-slate-200 cursor-pointer hover:bg-slate-100 ${selected ? "bg-slate-200" : ""}`}
			>
				<div className="flex items-center">
					<div className="h-10 w-10 bg-gray-300 rounded-full mr-3">
						<img
							src={participant?.profilePicture}
							alt="User Avatar"
							className="h-10 w-10 rounded-full"
						/>
					</div>
					<div className="flex-1">
						<h4 className="font-semibold">{`${participant?.firstName} ${participant?.lastName ?? ""}`}</h4>
						<p className="text-sm text-gray-500">Last message preview...</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
