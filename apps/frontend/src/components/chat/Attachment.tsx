import { IoClose } from "react-icons/io5";

export default function Attachment() {
	return (
		<div className="flex w-52 shrink-0 items-center gap-3 rounded-md border border-slate-200 p-2">
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-slate-100">
				<span className="text-xs font-medium text-slate-500">PNG</span>
			</div>

			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-medium text-slate-700">
					portfolio.png
				</p>
				<p className="text-xs text-slate-400">843 KB</p>
			</div>

			<button
				type="button"
				className="text-slate-400 transition-colors hover:text-black"
			>
				<IoClose className="text-lg" />
			</button>
		</div>
	);
}
