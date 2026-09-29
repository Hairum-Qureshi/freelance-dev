import AdCard from "../components/AdCard";
import Filter from "../components/Filter";
import useJob from "../hooks/useJob";

export default function Listings() {
	const { allJobs } = useJob();

	// TODO - add logic to detect whether a listing has been applied to already - maybe have it so that listings that you haven't applied to are the only jobs that show on the feed
	return (
		<div className="min-h-screen w-full bg-slate-100 px-4 py-6 sm:px-6">
			<div className="flex flex-row w-[87%] m-auto space-x-4">
				<Filter />
				<div className="space-y-3 flex-1">
					{!allJobs?.length ? (
						<h3 className="flex text-xl items-center h-full justify-center text-slate-600 text-center">
							There are currently no listings available at this time. <br />
							Please check back later.
						</h3>
					) : (
						allJobs.map(job => <AdCard key={job.id} job={job} />)
					)}
				</div>
			</div>
		</div>
	);
}
