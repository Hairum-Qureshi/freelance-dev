import { useCurrentUser } from "../../hooks/useCurrentUser";

const inputClassName =
	"mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

export default function ProfileDetails() {
	const { data: currentUser } = useCurrentUser();

	return (
		<section>
			<h2 className="text-xl font-semibold text-gray-900">Profile details</h2>
			<p className="mt-1 text-sm text-gray-500">
				Update your public profile information.
			</p>
			<div className="mt-6 flex items-center gap-4">
				<img
					src={currentUser?.profilePicture}
					alt="Profile"
					className="h-16 w-16 rounded-full border border-gray-200 object-cover"
					referrerPolicy="no-referrer"
				/>
				<button
					type="button"
					className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Change photo
				</button>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
				<label className="text-sm font-medium text-gray-700">
					First name
					<input
						type="text"
						className={inputClassName}
						defaultValue={currentUser?.firstName}
					/>
				</label>
				<label className="text-sm font-medium text-gray-700">
					Last name
					<input
						type="text"
						className={inputClassName}
						defaultValue={currentUser?.lastName}
					/>
				</label>
			</div>
			<label className="mt-4 block text-sm font-medium text-gray-700">
				Email
				<input
					type="email"
					className={`${inputClassName} bg-gray-100 text-gray-500`}
					defaultValue={currentUser?.email}
					disabled
				/>
			</label>
			<label className="mt-4 block text-sm font-medium text-gray-700">
				Bio
				<textarea
					className={`${inputClassName} min-h-28 resize-y`}
					placeholder="Tell people a little about yourself."
				/>
			</label>
			<label className="mt-4 block text-sm font-medium text-gray-700">
				Location
				<input
					type="text"
					className={`${inputClassName} text-gray-500`}
					defaultValue={currentUser?.location ?? ""}
				/>
			</label>
			<button
				type="button"
				className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
			>
				Save profile
			</button>
		</section>
	);
}
