import { useState } from "react";
import {
	FaEnvelope,
	FaPaperPlane,
	FaQuestionCircle,
	FaCheck
} from "react-icons/fa";

export default function Contact() {
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "general",
		message: ""
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-5xl">
				{/* Top Header */}
				<div className="mb-10 text-center sm:text-left">
					<h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
						We'd love to hear from you
					</h1>
					<p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
						Have questions about Freelance Dev, feedback on a project, or need
						support? Send us a message and we'll get back to you soon.
					</p>
				</div>

				{/* Two-Column Grid */}
				<div className="grid gap-8 lg:grid-cols-12">
					{/* Left Column: Info & Highlights */}
					<div className="space-y-6 lg:col-span-5">
						<div className="rounded-2xl border border-gray-200 bg-slate-50/70 p-6 sm:p-7">
							<h2 className="text-lg font-bold text-gray-900 mb-2">
								How can we help?
							</h2>
							<p className="text-sm text-gray-600 leading-relaxed mb-6">
								Whether you are an aspiring developer trying to take on your
								first client, or a business looking for eager talent, our team
								is here for you.
							</p>

							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 shrink-0">
										<FaQuestionCircle size={15} />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-gray-900">
											General Questions
										</h3>
										<p className="text-xs text-gray-600">
											Inquiries about how our platform and onboarding process
											work.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 shrink-0">
										<FaEnvelope size={14} />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-gray-900">
											Support & Feedback
										</h3>
										<p className="text-xs text-gray-600">
											Report bugs, suggest improvements, or ask for account
											help.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Quick Note Box */}
						<div className="rounded-xl border border-gray-200 bg-white p-5 text-xs text-gray-600 leading-relaxed">
							<strong className="text-gray-900 font-semibold block mb-1">
								Quick Note
							</strong>
							Response times vary and depend on the nature of your inquiry. We
							strive to respond as quickly as possible.
						</div>
					</div>

					{/* Right Column: Contact Form */}
					<div className="lg:col-span-7">
						<div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
							{submitted ? (
								<div className="py-12 text-center space-y-4">
									<div className="w-12 h-12 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center">
										<FaCheck size={20} />
									</div>
									<h2 className="text-xl font-bold text-gray-900">
										Message Sent!
									</h2>
									<p className="text-sm text-gray-600 max-w-sm mx-auto">
										Thank you for reaching out. We have received your message
										and will get back to you shortly.
									</p>
									<button
										type="button"
										onClick={() => {
											setSubmitted(false);
											setFormData({
												name: "",
												email: "",
												subject: "general",
												message: ""
											});
										}}
										className="mt-4 inline-block px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
									>
										Send another message
									</button>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-5">
									<div className="grid gap-5 sm:grid-cols-2">
										<div>
											<label
												htmlFor="name"
												className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700"
											>
												Your Name
											</label>
											<input
												id="name"
												required
												type="text"
												placeholder="Jane Doe"
												value={formData.name}
												onChange={e =>
													setFormData({ ...formData, name: e.target.value })
												}
												className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
											/>
										</div>

										<div>
											<label
												htmlFor="email"
												className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700"
											>
												Email Address
											</label>
											<input
												id="email"
												required
												type="email"
												placeholder="jane@example.com"
												value={formData.email}
												onChange={e =>
													setFormData({ ...formData, email: e.target.value })
												}
												className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="subject"
											className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700"
										>
											Topic
										</label>
										<select
											id="subject"
											value={formData.subject}
											onChange={e =>
												setFormData({ ...formData, subject: e.target.value })
											}
											className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
										>
											<option value="general">General Inquiry</option>
											<option value="developer-support">
												Developer Support
											</option>
											<option value="client-support">
												Client / Hiring Support
											</option>
											<option value="feedback">Feedback & Suggestions</option>
											<option value="bug">Report an Issue</option>
										</select>
									</div>

									<div>
										<label
											htmlFor="message"
											className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700"
										>
											Your Message
										</label>
										<textarea
											id="message"
											required
											rows={5}
											placeholder="How can we help you today?"
											value={formData.message}
											onChange={e =>
												setFormData({ ...formData, message: e.target.value })
											}
											className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
										/>
									</div>

									<button
										type="submit"
										className="w-full flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:bg-gray-900 cursor-pointer"
									>
										<FaPaperPlane size={13} />
										Send Message
									</button>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
