module.exports = {
	content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
	theme: {
		extend: {
			animation: {
				"spin-slow": "spin 20s linear infinite"
			},
			colors: {
				"react": {
					"support": "#282c34",
					"link": "#61dafb"
				}
			}
		}
	},
	plugins: []
};
