export default function ChatHeader() {
	return (
		<div className="border-b border-slate-200 p-3 flex items-center h-[65px] shrink-0">
			<img
				src="https://i.pinimg.com/236x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg?nii=t"
				alt="Message"
				className="h-10 w-10 rounded-full object-cover border-2 border-slate-200"
			/>
			<div className="ml-3">
				<p className="font-semibold text-base leading-tight">John Doe</p>
				<p className="text-sm text-gray-500">Product Manager</p>
			</div>
		</div>
	);
}
