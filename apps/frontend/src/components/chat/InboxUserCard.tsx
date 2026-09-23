import type { Participant } from "@repo/shared-types";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function InboxUserCard({
	selected,
	chatId,
	participants,
	setSelectedChat,
	latestMessage
}: {
	selected: boolean;
	chatId: string;
	participants: { user: Participant }[];
	setSelectedChat: (chat: {
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		hirerTitle: string;
	}) => void;
	latestMessage: string;
}) {
	const { data: currUser } = useCurrentUser();
	const { chatID } = useParams();

	const participant = participants.find(
		p => p.user.id !== currUser?.id && p.user.id !== "1"
	)?.user;

	useEffect(() => {
		setSelectedChat({
			id: chatID as string,
			firstName: participant?.firstName ?? "",
			lastName: participant?.lastName ?? "",
			profilePicture: participant?.profilePicture ?? "",
			hirerTitle: participant?.onboardingAnswers?.hirerTitle ?? ""
		});
	}, []);

	return (
		<Link to={`/inbox/c/${chatId}`}>
			<div
				onClick={() =>
					setSelectedChat({
						id: chatId,
						firstName: participant?.firstName ?? "",
						lastName: participant?.lastName ?? "",
						profilePicture: participant?.profilePicture ?? "",
						hirerTitle: participant?.onboardingAnswers?.hirerTitle ?? ""
					})
				}
				className={`p-3 border-t border-b border-slate-200 cursor-pointer hover:bg-slate-100 ${selected ? "bg-slate-200" : ""}`}
			>
				<div className="flex items-center">
					<div className="h-10 w-10 bg-gray-300 rounded-full mr-3">
						<img
							src={participant?.profilePicture}
							alt="User Avatar"
							referrerPolicy="no-referrer"
							className="h-10 w-10 rounded-full"
						/>
					</div>
					<div className="flex-1">
						<h4 className="font-semibold">{`${participant?.firstName} ${participant?.lastName ?? ""}`}</h4>
						<p className="text-sm text-slate-500 truncate w-5/6">
							{latestMessage}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
