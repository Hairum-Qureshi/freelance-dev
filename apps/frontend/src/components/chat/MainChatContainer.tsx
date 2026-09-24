import { useState } from "react";
import useChat from "../../hooks/useChat";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import ChatBubble from "./ChatBubble";
import ChatImageBubble from "./ChatImageBubble";
import ChatFileBubble from "./ChatFileBubble";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import SlideShow from "../SlideShow";

dayjs.extend(relativeTime);
dayjs.extend(utc);

// TODO - need to handle last message
// TODO - need to handle read status

export default function MainChatContainer() {
	const { chatMessages } = useChat();
	const { data: currUserData } = useCurrentUser();
	const [showSlideshowOverlay, setShowSlideshowOverlay] = useState(false);
	const [slideshowImages, setSlideshowImages] = useState<string[]>([]);
	const [clickedImageIndex, setClickedImageIndex] = useState<number>(0);

	return showSlideshowOverlay ? (
		<SlideShow
			setShowSlideshowOverlay={setShowSlideshowOverlay}
			images={slideshowImages}
			clickedImageIndex={clickedImageIndex}
			setClickedImageIndex={setClickedImageIndex}
		/>
	) : (
		<div className="flex-1 min-h-0 overflow-y-auto">
			{chatMessages?.map(message => {
				const imageAttachments = message.attachments.filter(
					attachment => attachment.fileType === "image"
				);
				const you = message.senderId === currUserData?.id;

				if (message.attachments.length) {
					return (
						<div key={message.id}>
							{imageAttachments.length > 0 && (
								<ChatImageBubble
									text={message.message}
									attachments={imageAttachments}
									profilePicture={message.sender.profilePicture}
									you={you}
									lastMessage={false}
									postedAt={dayjs.utc(message.createdAt).fromNow()}
									setShowSlideshowOverlay={setShowSlideshowOverlay}
									setSlideshowImages={setSlideshowImages}
									setClickedImageIndex={setClickedImageIndex}
								/>
							)}
							{message.attachments.filter(
								attachment => attachment.fileType === "pdf"
							).length > 0 && (
								<ChatFileBubble
									files={message.attachments
										.filter(attachment => attachment.fileType === "pdf")
										.map(attachment => ({
											id: attachment.id,
											name: attachment.fileName,
											size: "",
											type: "application/pdf",
											url: attachment.url
										}))}
									text={imageAttachments.length ? undefined : message.message}
									you={you}
									lastMessage={false}
									postedAt={dayjs.utc(message.createdAt).fromNow()}
									profilePicture={message.sender.profilePicture}
								/>
							)}
						</div>
					);
				}

				return (
					<ChatBubble
						key={message.id}
						text={message.message}
						you={you}
						lastMessage={false}
						profilePicture={message.sender.profilePicture}
						postedAt={dayjs.utc(message.createdAt).fromNow()}
					/>
				);
			})}
		</div>
	);
}
