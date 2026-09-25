import ChatFooter from "../components/chat/ChatFooter";
import { useLocation, useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import { HiMagnifyingGlass } from "react-icons/hi2";
import MainChatContainer from "../components/chat/MainChatContainer";
import useUser from "../hooks/useUser";
import useChat from "../hooks/useChat";
import { useEffect, useState } from "react";
import InboxUserCard from "../components/chat/InboxUserCard";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { ChatPayload } from "@repo/shared-types";

export default function Inbox() {
	const { userProfileData } = useUser();
	const { data: currUserData } = useCurrentUser();
	const { currUserChats, chatParticipants } = useChat();

	// TODO - add autoscroll to bottom of inbox for latest message
	// TODO - add an ability to remove a chat from the list of chats
	// ! for some reason when you click on an image from a message and the slideshow appears, the textarea send and file upload buttons get pushed up to the top

	const location = useLocation();

	const [selectedChat, setSelectedChat] = useState<{
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		hirerTitle: string;
	} | null>(null);

	useEffect(() => {
		if (location.pathname === "/inbox") setSelectedChat(null);
		if (chatParticipants) {
			const otherUser = chatParticipants.filter(
				participant => participant.user?.id !== currUserData?.id
			);
			if (!otherUser.length) return;
			setSelectedChat({
				id: otherUser[0].user?.id ?? "",
				firstName: otherUser[0].user?.firstName ?? "",
				lastName: otherUser[0].user?.lastName ?? "",
				profilePicture: otherUser[0].user?.profilePicture ?? "",
				hirerTitle: otherUser[0].user?.onboardingAnswers?.hirerTitle ?? "N/A"
			});
		}
	}, [location, chatParticipants]);

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
								selected={selectedChat?.id === chat.id}
								chatId={chat.id}
								participants={chat.participants}
								setSelectedChat={setSelectedChat}
								latestMessage={
									!chat.latestMessage.message
										? "Attached file(s)"
										: chat.latestMessage.message
								}
							/>
						))
					) : (
						<p className="text-center text-gray-400 m-5">
							You currently have no conversations
						</p>
					)}
				</div>
			</div>
			<div className="border border-slate-200 h-full w-4/5 flex flex-col">
				{userProfileData || selectedChat ? (
					<>
						<ChatHeader
							profilePicture={
								userProfileData
									? userProfileData.profilePicture
									: (selectedChat?.profilePicture ?? "")
							}
							name={
								userProfileData
									? `${userProfileData.firstName} ${userProfileData.lastName ?? ""}`
									: selectedChat
										? `${selectedChat.firstName} ${selectedChat.lastName ?? ""}`
										: ""
							}
							title={
								userProfileData
									? (userProfileData.onboardingAnswers?.hirerTitle ?? "N/A")
									: (selectedChat?.hirerTitle ?? "N/A")
							}
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
