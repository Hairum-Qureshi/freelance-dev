import ChatFooter from "../components/chat/ChatFooter";
import ChatHeader from "../components/chat/ChatHeader";
import { HiMagnifyingGlass } from "react-icons/hi2";
import MainChatContainer from "../components/chat/MainChatContainer";
import useUser from "../hooks/useUser";
import useChat from "../hooks/useChat";
import { useEffect, useState } from "react";
import InboxUserCard from "../components/chat/InboxUserCard";

export default function Inbox() {
	const { userProfileData } = useUser();

	const [showMessageContainer, setShowMessageContainer] = useState(false);

	const { currUserChats } = useChat();

	useEffect(() => {
		setShowMessageContainer(!!userProfileData);
	}, [userProfileData]);

	// if you're a hirer, add a 'Hire' button in the conversation header

	return (
		<div className="h-[calc(100vh-4rem)] flex">
			<div className="border border-slate-200 h-full overflow-y-scroll w-[25%]">
				<div className="border-b border-slate-200 p-3 flex items-center h-[65px]">
					<div className="flex items-center border border-slate-200 rounded-md p-1 w-full">
						<HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search"
							className="ml-2 outline-none border-none w-full bg-transparent"
						/>
					</div>
				</div>
				<div className="p-3 flex text-sm">
					<h3 className="uppercase font-semibold text-gray-400">Messages</h3>
					<h3 className="ml-auto text-gray-400">
						{currUserChats?.length ?? 0}
					</h3>
				</div>
				<div>
					{currUserChats?.length ? (
						currUserChats.map(chat => (
							<InboxUserCard
								key={chat.id}
								selected={false}
								chatId={chat.id}
								participants={chat.participants}
							/>
						))
					) : (
						<p className="text-center text-gray-400 m-5">
							You currently have no conversations
						</p>
					)}
					{/* <InboxUserCard selected />
					<InboxUserCard selected={false} />
					<InboxUserCard selected={false} />
					<InboxUserCard selected={false} />
					<InboxUserCard selected={false} />
					<InboxUserCard selected={false} /> */}
				</div>
			</div>
			<div className="border border-slate-200 h-full w-4/5 flex flex-col">
				{showMessageContainer ? (
					<>
						<ChatHeader
							profilePicture={userProfileData?.profilePicture ?? ""}
							name={`${userProfileData?.firstName} ${userProfileData?.lastName ?? ""}`}
							title={userProfileData?.onboardingAnswers?.hirerTitle ?? "N/A"}
						/>
						<MainChatContainer />
						<ChatFooter />
					</>
				) : (
					<div className="flex-1 flex items-center justify-center">
						<h3 className="text-center text-black text-2xl w-7/12">
							Click on a contact to resume chatting by selecting a user from the
							list. If you have no contacts, you can invite them to join by
							visiting their profile.
						</h3>
					</div>
				)}
			</div>
		</div>
	);
}
