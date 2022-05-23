import React from "react";

function Help() {
	return (
		<div className="px-8 py-2 md:px-14 md:py-8 lg:py-12 w-full space-y-6">
			<h1 className="hidden md:inline font-semibold text-3xl text-light-100 dark:text-dark-100">Help</h1>
			<div className="space-y-4">
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">What is this?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						This is osu! Inactive User Rankings, inspired by <a href="https://osu.ppy.sh/users/11320627" target="_blank" rel="noreferrer" className="text-light-100 dark:text-dark-100">Venta</a>&apos;s score ranking spreadsheet which (mainly) tracks Indonesian top user scores.
						Since osu! website only lists global ranks and looking for automated way of updating the sheet, this site and API is made for that.
						The UI and UX is mainly inspired by Mr HeliX&apos;s <a href="https://snipe.huismetbenen.nl" target="_blank" rel="noreferrer" className="text-light-100 dark:text-dark-100">osu!snipe</a> website and probably ran the same way. ;)
					</p>
					<p className="font-medium text-light-80 dark:text-dark-80">
						In this site, you can:
					</p>
					<ul className="list-disc list-inside">
						<li className="font-medium text-light-80 dark:text-dark-80">Look at country and global users&apos; scores leaderboard</li>
						<li className="font-medium text-light-80 dark:text-dark-80">Find recently inactive users and rankings</li>
						<li className="font-medium text-light-80 dark:text-dark-80">And more to come.</li>
					</ul>
					<p className="font-medium text-light-80 dark:text-dark-80">The data is fetched from osu! API (only top 10,000 score rankings for now) on a weekly basis so some users might be missing.</p>
				</div>
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Who made this?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						Shigeru22.
					</p>
					<ul className="list-disc list-inside">
						<li className="font-medium text-light-80 dark:text-dark-80"><a href="https://osu.ppy.sh/users/2581664" target="_blank" rel="noreferrer" className="text-light-100 dark:text-dark-100">osu! profile</a></li>
						<li className="font-medium text-light-80 dark:text-dark-80"><a href="https://github.com/shigeru22" target="_blank" rel="noreferrer" className="text-light-100 dark:text-dark-100">GitHub</a></li>
						<li className="font-medium text-light-80 dark:text-dark-80">Discord: Shigeru#5061</li>
					</ul>
				</div>
				<h2 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Why there is no such country listed?</h2>
				<div className="space-y-2">
					<p className="font-medium text-light-80 dark:text-dark-80">
						This site is ran using limited database, thus the number of countries is restricted. Contact me for information about country additions!
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
						That&apos;s nice! Feel free to open a pull request or give myself a suggestion.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Help;
