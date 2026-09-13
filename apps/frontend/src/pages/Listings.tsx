import AdCard from "../components/AdCard";

export default function Listings() {
	return (
		<div className="min-h-screen w-full bg-slate-100 px-4 py-6 sm:px-6">
			<div className="flex flex-row w-[87%] m-auto space-x-4">
				<div className="w-full h-fit max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
					<div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
						<h1 className="text-lg font-semibold text-slate-900">Filters</h1>
						<button className="text-sm text-red-500 hover:text-red-600">
							Clear All
						</button>
					</div>
					<div className="space-y-7">
						<div>
							<h2 className="mb-3 text-sm font-semibold text-slate-900">
								Location
							</h2>
							<select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-500">
								<option value="">Select a location</option>
								<option value="option1">North America</option>
								<option value="option4">South America</option>
								<option value="option5">Africa</option>
								<option value="option2">Europe</option>
								<option value="option3">Asia</option>
							</select>
						</div>
						<div>
							<h2 className="mb-3 text-sm font-semibold text-slate-900">
								Job Type
							</h2>

							<div className="space-y-3">
								<label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
									<input
										type="checkbox"
										className="h-4 w-4 rounded border-slate-300"
									/>
									Full-time
								</label>
								<label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
									<input
										type="checkbox"
										className="h-4 w-4 rounded border-slate-300"
									/>
									Part-time
								</label>

								<label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
									<input
										type="checkbox"
										className="h-4 w-4 rounded border-slate-300"
									/>
									Contract
								</label>

								<label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
									<input
										type="checkbox"
										className="h-4 w-4 rounded border-slate-300"
									/>
									One-time
								</label>

								<label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
									<input
										type="checkbox"
										className="h-4 w-4 rounded border-slate-300"
									/>
									Remote
								</label>
							</div>
						</div>
						<div>
							<h2 className="mb-3 text-sm font-semibold text-slate-900">
								Experience Level
							</h2>
							<div className="space-y-3">
								<label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
									<input
										type="checkbox"
										className="mt-0.5 h-4 w-4 rounded border-slate-300"
									/>
									<span>
										<span className="block text-slate-700">Entry Level</span>
										<span className="text-xs text-slate-400">
											Just starting out
										</span>
									</span>
								</label>
								<label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
									<input
										type="checkbox"
										className="mt-0.5 h-4 w-4 rounded border-slate-300"
									/>
									<span>
										<span className="block text-slate-700">Mid Level</span>
										<span className="text-xs text-slate-400">
											Some experience required
										</span>
									</span>
								</label>
							</div>
						</div>
						<div>
							<h2 className="mb-3 text-sm font-semibold text-slate-900">
								Expected Salary
							</h2>
							<div className="flex gap-3">
								<input
									type="number"
									placeholder="Min"
									className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-slate-500"
								/>
								<input
									type="number"
									placeholder="Max"
									className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-slate-500"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="space-y-3 flex-1">
					{/* <AdCard />
					<AdCard />
					<AdCard />
					<AdCard /> */}
					<h3 className="flex text-xl items-center h-full justify-center text-slate-600 text-center">
						There are currently no listings available at this time. <br />
						Please check back later.
					</h3>
				</div>
			</div>
		</div>
	);
}
