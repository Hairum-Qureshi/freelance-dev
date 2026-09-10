export default function Body() {
	return (
		<section className="mx-auto my-16 w-5/6">
			<div className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm md:p-12">
				<div className="max-w-4xl">
					<p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
						Why it feels hard
					</p>
					<h2 className="text-2xl font-semibold leading-relaxed text-slate-900 md:text-4xl md:leading-snug">
						We understand how challenging it can be to start freelancing and
						make extra cash without getting overshadowed by more experienced
						professionals.
					</h2>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					<div className="rounded-2xl bg-slate-50 p-5">
						<p className="text-sm font-semibold text-slate-900">Start small</p>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Find projects that match your current skill level and build
							momentum without the pressure of competing with senior
							professionals.
						</p>
					</div>
					<div className="rounded-2xl bg-slate-50 p-5">
						<p className="text-sm font-semibold text-slate-900">Build trust</p>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Create a portfolio, earn early wins, and show clients the value
							you can deliver with consistency.
						</p>
					</div>
					<div className="rounded-2xl bg-slate-50 p-5">
						<p className="text-sm font-semibold text-slate-900">
							Grow steadily
						</p>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Turn small opportunities into long-term experience, better rates,
							and a stronger freelance path.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
