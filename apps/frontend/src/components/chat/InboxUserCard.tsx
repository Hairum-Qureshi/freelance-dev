export default function InboxUserCard({ selected }: { selected: boolean }) {
	return (
		<div
			className={`p-3 border-t border-b border-slate-200 cursor-pointer hover:bg-slate-100 ${selected ? "bg-slate-200" : ""}`}
		>
			<div className="flex items-center">
				<div className="h-10 w-10 bg-gray-300 rounded-full mr-3">
					<img
						src="https://i.pinimg.com/236x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg?nii=t"
						alt="User Avatar"
						className="h-10 w-10 rounded-full"
					/>
				</div>
				<div className="flex-1">
					<h4 className="font-semibold">User Name</h4>
					<p className="text-sm text-gray-500">Last message preview...</p>
				</div>
			</div>
		</div>
	);
}
