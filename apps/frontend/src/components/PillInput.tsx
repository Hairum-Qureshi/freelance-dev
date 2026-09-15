import { useState } from "react";

interface PillInputProps {
	label: string;
	name: string;
	placeholder: string;
	initialValues: string[];
}

export default function PillInput({
	label,
	name,
	placeholder,
	initialValues
}: PillInputProps) {
	const [values, setValues] = useState(initialValues);
	const [inputValue, setInputValue] = useState("");
	const addPill = () => {
		const value = inputValue.trim();
		if (value && !values.includes(value)) {
			setValues([...values, value]);
		}
		setInputValue("");
	};

	return (
		<label className="mt-4 block text-sm font-medium text-slate-700">
			{label}
			<div className="mt-1 rounded-md border border-slate-300 p-2 focus-within:border-slate-950">
				<div className="flex flex-wrap gap-2">
					{values.map((value, index) => (
						<button
							key={`${value}-${index}`}
							type="button"
							onClick={() =>
								setValues(currentValues =>
									currentValues.filter(
										(_, currentIndex) => currentIndex !== index
									)
								)
							}
							className="rounded-full bg-slate-950 px-3 py-1 text-sm text-white hover:bg-slate-700"
							aria-label={`Remove ${value}`}
						>
							{value} x
						</button>
					))}
					<input
						value={inputValue}
						onChange={event => setInputValue(event.target.value)}
						onKeyDown={event => {
							if (event.key === "Enter") {
								event.preventDefault();
								addPill();
							}
						}}
						className="min-w-40 flex-1 px-1 py-1 text-sm text-slate-900 outline-none"
						placeholder={placeholder}
					/>
				</div>
			</div>
			<input type="hidden" name={name} value={values.join(",")} />
		</label>
	);
}
