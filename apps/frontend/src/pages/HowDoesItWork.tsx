export default function HowDoesItWork() {
	return (
		<div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-5xl">
				{/* Header */}
				<div className="mb-12">
					<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
						Get started
					</p>

					<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
						How It Works
					</h1>

					<div className="mt-5 h-1 w-16 bg-slate-900" />

					<p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
						Connect with people looking to get work done, find projects that
						match your skills, and manage your work from one place.
					</p>
				</div>

				{/* Hirer Section */}
				<section className="border-t border-slate-200 pt-10">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							For Hirers
						</p>

						<h2 className="mt-2 text-2xl font-bold text-slate-900">
							Find the right freelancer for your project.
						</h2>

						<p className="mt-3 max-w-2xl text-slate-600">
							Describe what you need, review applications from freelancers, and
							choose someone who fits your project and budget.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						{/* Step 1 */}
						<div className="border border-slate-900 bg-white p-6">
							<div className="mb-5 flex h-10 w-10 items-center justify-center bg-slate-900 text-sm font-bold text-white">
								01
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Post a Project
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								Describe your project, including what you need, your
								requirements, expected deliverables, budget, and any other
								details freelancers should know before applying.
							</p>
						</div>

						{/* Step 2 */}
						<div className="border border-slate-300 bg-white p-6">
							<div className="mb-5 flex h-10 w-10 items-center justify-center border border-slate-900 text-sm font-bold text-slate-900">
								02
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Review Applications
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								Review the freelancers who apply to your project. Compare their
								profiles, experience, proposals, and other relevant information
								before deciding who you'd like to work with.
							</p>
						</div>

						{/* Step 3 */}
						<div className="border border-slate-300 bg-white p-6">
							<div className="mb-5 flex h-10 w-10 items-center justify-center border border-slate-900 text-sm font-bold text-slate-900">
								03
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Choose a Freelancer
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								Once you've found a freelancer you'd like to work with, accept
								their application and use the inbox to discuss the project
								details, expectations, and next steps.
							</p>
						</div>
					</div>
				</section>

				{/* Freelancer Section */}
				<section className="border-t border-slate-200 pt-10">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							For Freelancers
						</p>

						<h2 className="mt-2 text-2xl font-bold text-slate-900">
							Find projects that match your skills.
						</h2>

						<p className="mt-3 max-w-2xl text-slate-600">
							Build your profile, discover available projects, and apply to
							opportunities where you can provide value and gain experience.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						{/* Step 1 */}
						<div className="border border-slate-900 bg-white p-6">
							<div className="mb-5 flex h-10 w-10 items-center justify-center bg-slate-900 text-sm font-bold text-white">
								01
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Find Projects
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								Browse available projects and review their requirements, budget,
								and other details. Focus on opportunities that match your skills
								and experience.
							</p>
						</div>

						{/* Step 2 */}
						<div className="border border-slate-300 bg-white p-6">
							<div className="mb-5 flex h-10 w-10 items-center justify-center border border-slate-900 text-sm font-bold text-slate-900">
								02
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Submit an Application
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								Apply to projects you're interested in. Introduce yourself,
								explain why you're a good fit, and provide any relevant
								information that can help the hirer understand what you can
								bring to the project.
							</p>
						</div>

						{/* Step 3 */}
						<div className="border border-slate-300 bg-white p-6">
							<div className="mb-5 flex h-10 w-10 items-center justify-center border border-slate-900 text-sm font-bold text-slate-900">
								03
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Work With the Client
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								If your application is accepted, communicate with the client
								through the inbox to clarify requirements, share updates,
								complete the work, and move the project toward completion.
							</p>
						</div>
					</div>
				</section>

				{/* Outcomes */}
				<section className="border-t border-slate-200 pt-10">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							What happens next
						</p>

						<h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
							After You Apply
						</h2>

						<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
							Every application leads to one of two outcomes. Regardless of the
							result, each application can help you better understand what
							clients are looking for and where you can improve.
						</p>
					</div>

					{/* Primary Outcomes */}
					<div className="grid gap-4 md:grid-cols-2">
						{/* Rejection */}
						<div className="group border border-slate-200 p-6 transition hover:border-red-300">
							<div className="mb-6 flex items-center justify-between">
								<span className="text-sm font-semibold uppercase tracking-widest text-red-500">
									Rejection
								</span>

								<span className="text-2xl font-light text-slate-300">01</span>
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Keep moving forward.
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								Not every application will be successful. A client may choose
								another freelancer for a variety of reasons. Handle the decision
								professionally, learn from any feedback you receive, and
								continue looking for projects that match your skills.
							</p>
						</div>

						{/* Acceptance */}
						<div className="group border border-slate-200 p-6 transition hover:border-green-300">
							<div className="mb-6 flex items-center justify-between">
								<span className="text-sm font-semibold uppercase tracking-widest text-green-600">
									Acceptance
								</span>

								<span className="text-2xl font-light text-slate-300">02</span>
							</div>

							<h3 className="text-lg font-semibold text-slate-900">
								Make the opportunity count.
							</h3>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								If your application is accepted, you'll be able to communicate
								with the client about the project. Make sure you understand the
								requirements, agree on expectations, keep the client updated,
								and deliver the agreed-upon work.
							</p>
						</div>
					</div>

					{/* Additional Situations */}
					<div className="mt-10">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							A few things to keep in mind
						</p>

						<div className="mt-4 flex w-full flex-col gap-4">
							{/* Not Hired */}
							<div className="w-full border border-slate-200 p-6">
								<h3 className="text-lg font-semibold text-slate-900">
									Not hired? Don't harass the client.
								</h3>

								<p className="mt-2 text-sm leading-6 text-slate-600">
									If you are not hired for a project, it's important to respect
									the client's decision. Avoid sending repeated messages,
									complaints, or any form of harassment. Maintaining
									professionalism will help you build a positive reputation and
									increase your chances of being hired for future projects.
								</p>
							</div>

							{/* Declining an Accepted Project */}
							<div className="w-full border border-slate-200 p-6">
								<h3 className="text-lg font-semibold text-slate-900">
									Hired but no longer interested? You're free to decline.
								</h3>

								<p className="mt-2 text-sm leading-6 text-slate-600">
									If you find yourself in a situation where you are hired for a
									project but no longer interested, you have the right to
									decline. Communicate your decision politely and professionally
									to the client, and provide any necessary context or notice.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Inbox */}
				<section className="border-t border-slate-200 pt-10">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							Reaching out
						</p>

						<h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
							Inbox
						</h2>

						<p className="mt-3 max-w-2xl text-slate-600">
							Your inbox is where you'll communicate with clients about
							applications and active projects. Use it to ask questions, share
							files, discuss requirements, and keep important project updates in
							one place.
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<div className="border border-slate-200 p-6">
							<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
								Use your inbox for
							</p>

							<ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
								<li>• Discussing project requirements</li>
								<li>• Asking questions before or during a project</li>
								<li>• Sharing files and project updates</li>
								<li>• Clarifying expectations and deliverables</li>
								<li>• Communicating about project progress</li>
							</ul>
						</div>

						<div className="border border-slate-200 bg-slate-50 p-6">
							<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
								Keep it project-related
							</p>

							<p className="mt-4 text-sm leading-6 text-slate-600">
								The inbox is intended for communication related to your
								applications and projects. Avoid using it for general
								discussions, unrelated conversations, or repeated messages
								intended only to get someone's attention.
							</p>
						</div>
					</div>

					<div className="mt-4 border border-slate-200 p-6">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							Asynchronous communication
						</p>

						<p className="mt-4 text-sm leading-6 text-slate-600">
							The inbox is asynchronous, meaning you and the other person do not
							need to be online at the same time to communicate. Allow
							reasonable time for responses and avoid sending repeated messages
							when someone has not responded yet.
						</p>
					</div>
				</section>

				{/* Notifications */}
				<section className="border-t border-slate-200 pt-10">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							Stay informed
						</p>

						<h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
							Notifications
						</h2>

						<p className="mt-3 max-w-2xl text-slate-600">
							Important activity can be surfaced through notifications so you
							don't have to constantly check the platform for updates.
						</p>
					</div>

					<div className="border border-slate-200 p-6">
						<ul className="grid gap-4 text-sm leading-6 text-slate-600 md:grid-cols-2">
							<li>
								<span className="font-semibold text-slate-900">
									Application updates
								</span>
								<br />
								Know when a client has responded to your application.
							</li>

							<li>
								<span className="font-semibold text-slate-900">
									New messages
								</span>
								<br />
								Receive an update when someone sends you a message.
							</li>

							<li>
								<span className="font-semibold text-slate-900">
									Project activity
								</span>
								<br />
								Stay aware of important changes or updates to your projects.
							</li>

							<li>
								<span className="font-semibold text-slate-900">
									Notification preferences
								</span>
								<br />
								Manage how and when you want to be notified about activity.
							</li>
						</ul>
					</div>
				</section>

				{/* Payment */}
				<section className="border-t border-slate-200 pt-10">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
							Project completion
						</p>

						<h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
							Payment
						</h2>

						<p className="mt-3 max-w-2xl text-slate-600">
							Projects involve an agreed-upon budget between the hirer and
							freelancer. Make sure both sides understand the scope of work,
							expected deliverables, and payment terms before work begins.
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<div className="border border-slate-200 p-6">
							<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
								For Hirers
							</p>

							<p className="mt-4 text-sm leading-6 text-slate-600">
								Make sure the project requirements and expected deliverables are
								clearly understood before work begins. Review the completed work
								and follow the platform's payment process when the project is
								ready to be completed.
							</p>
						</div>

						<div className="border border-slate-200 p-6">
							<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
								For Freelancers
							</p>

							<p className="mt-4 text-sm leading-6 text-slate-600">
								Confirm the project scope and payment expectations before
								beginning work. Keep the client updated throughout the project
								and make sure the agreed-upon work is completed before
								requesting or receiving payment.
							</p>
						</div>
					</div>
				</section>

				{/* Closing */}
				<section className="border-t border-slate-200 pt-10">
					<div className="border border-slate-900 bg-slate-900 p-8 text-white">
						<p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
							Ready to get started?
						</p>

						<h2 className="mt-2 text-2xl font-bold">
							Find your next opportunity or post your next project.
						</h2>

						<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
							Whether you're looking to hire someone or build your experience as
							a freelancer, start by creating your profile and exploring what's
							available.
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
