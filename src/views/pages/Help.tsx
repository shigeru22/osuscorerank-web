import React from "react";

function Help() {
	return (
		<div className="px-8 py-2 md:px-14 md:py-12 w-full space-y-6">
			<h1 className="font-semibold text-3xl text-light-100 dark:text-dark-100">Help</h1>
			<div className="space-y-4">
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">What is this?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						This is osu! Inactive User Rankings, inspired by Venta&apos;s score ranking spreadsheet which tracks inactive users.
						Looking for automated way of updating the sheet, this site and API is made for that.
						The UI and UX is mainly inspired by Mr HeliX&apos;s osu!snipe website and probably ran the same way.
					</p>
					<p className="font-medium text-light-80 dark:text-dark-80">
						In this site, you can:
						<ul className="list-disc list-inside">
							<li>Look at inactive users&apos; leaderboard</li>
							<li>Find recently inactive users</li>
							<li>And more to come.</li>
						</ul>
					</p>
					<p className="font-medium text-light-80 dark:text-dark-80">The data is fetched from osu! API on a weekly basis so some users might be missing.</p>
				</div>
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Who made this?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						Shigeru22.
						<ul className="list-disc list-inside">
							<li>osu! profile</li>
							<li>GitHub</li>
							<li>Discord: Shigeru#5061</li>
						</ul>
					</p>
					<p className="font-medium text-light-80 dark:text-dark-80">The data is fetched from osu! API on a weekly basis so some users might be missing.</p>
				</div>
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Why there is no such country listed?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						This site is ran using limited database, thus the number of countries is restricted.
					</p>
				</div>
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Some users are not listed?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						TL;DR, read again.
					</p>
				</div>
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Any feedback or ideas?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						That’s nice! Feel free to open a pull request or give myself a suggestion.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Help;
