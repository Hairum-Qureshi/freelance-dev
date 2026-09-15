export default function AdCard() {
	return (
		<div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-400">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold text-black">
						Build a Landing Page for My Business
					</h2>

					<p className="mt-1 text-sm text-gray-500">
						Posted 2 hours ago · Remote
					</p>
				</div>

				<p className="whitespace-nowrap font-semibold text-black">
					$300 - $500
				</p>
			</div>

			<p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
				I'm looking for a developer to build a clean and responsive landing page
				for my small business. I already have the design and content prepared.
			</p>

			<div className="mt-4 flex flex-wrap gap-2">
				<span className="rounded-md bg-black px-3 py-1 text-xs font-medium text-white">
					React
				</span>

				<span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">
					TypeScript
				</span>

				<span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">
					Tailwind CSS
				</span>
			</div>

			<div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
				<p className="text-sm text-gray-500">Sarah Johnson · 4.9 ★</p>
				<div className="flex gap-2">
					<button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-gray-800">
						Contact
					</button>
					<button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-gray-800">
						View Posting
					</button>
				</div>
			</div>
		</div>
	);
}
