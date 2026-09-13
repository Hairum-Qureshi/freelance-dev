import ChatBubble from "./ChatBubble";
import ChatImageBubble from "./ChatImageBubble";
import ChatFileBubble from "./ChatFileBubble";

export default function MainChatContainer() {
	return (
		<div className="flex-1 min-h-0 overflow-y-auto">
			<ChatBubble
				text={
					"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolorum fugiat veniam ex pariatur quae eum temporibus mollitia impedit dolores quaerat molestias, aliquam illum libero praesentium autem inventore, officia eos. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias perferendis repellat illum praesentium pariatur tempora! Nobis, odit velit illum magni quam fugit error. Asperiores ducimus exercitationem aperiam eos sequi voluptates."
				}
				you={true}
				lastMessage={false}
			/>
			<ChatBubble text={"Heya"} you={false} lastMessage={false} />
			<ChatBubble text={"How are you?"} you={false} lastMessage={false} />
			<ChatBubble text={"I'm good, thanks!"} you={true} lastMessage={false} />
			<ChatBubble text={"Great to hear!"} you={false} lastMessage={false} />
			<ChatBubble text={"What about you?"} you={false} lastMessage={false} />
			<ChatBubble
				text={"I'm doing well too! Doing some work."}
				you={true}
				lastMessage={false}
			/>
			<ChatImageBubble
				images={[
					{
						id: "1",
						url: "https://randomwordgenerator.com/img/picture-generator/52e0d0474d51a414f1dc8460962e33791c3ad6e04e507440762e79d0964bc0_640.jpg",
						alt: "Image 1"
					},
					{
						id: "2",
						url: "https://randompicturegenerator.com/img/cat-generator/g3b840191b24b62c44d9cec4ac8db79e8212b646162b477671a39d6aa811aabdb4ff151059de20ffa556f76ad4360fdb1_640.jpg",
						alt: "Image 2"
					},
					{
						id: "3",
						url: "https://randompicturegenerator.com/img/cat-generator/g99d4b5e4a82c40eac966db95b6267d4263faf5662131fdf2e64c3a7ae7302c09b3de2f7309db176fc6f0066d59ad9b9a_640.jpg",
						alt: "Image 3"
					},
					{
						id: "4",
						url: "https://randompicturegenerator.com/img/cat-generator/g29756ec15ef634ecf8326ddc6861ad164cda975eb20f8145161bf4d3cf700732ec8dce74c2833ff44dbeb96df6099783_640.jpg",
						alt: "Image 4"
					}
					// {
					// 	id: "5",
					// 	url: "https://randompicturegenerator.com/img/cat-generator/ge4f77f62bfbc2e959d5d86094df12323029eb51b6031e072cb4d1de0961f671d5329682fcd4f66d17661c9f9c1b9ef36_640.jpg",
					// 	alt: "Image 5"
					// }
				]}
				text="Check out these images!"
				you={true}
				lastMessage={false}
			/>
			<ChatFileBubble
				file={{
					id: "1",
					name: "example.pdf",
					size: "1 MB",
					type: "application/pdf",
					url: "https://example.com/example.pdf"
				}}
				text="Here is a file for you."
				you={false}
				lastMessage
			/>
		</div>
	);
}
