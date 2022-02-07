module.exports = {
	content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
	theme: {
		fontFamily: {
			"sans": [ "Montserrat", "ui-sans-serif", "sans-serif" ]
		},
		colors: {
			black: "#000000",
			white: "#ffffff",
			light: {
				20: "#edfafd",
				40: "#90e0ef",
				60: "#00b4d8",
				80: "#0077b6",
				100: "#03045e"
			},
			dark: {
				0: "#10202d",
				20: "#162b3c",
				40: "#203e58",
				60: "#315a7c",
				80: "#8faabd",
				100: "#bed2dd"
			},
			danger: {
				light: {
					DEFAULT: "#f73b4e",
					active: "#d0091e"
				},
				dark: {
					DEFAULT: "#9d0716",
					active: "#c3091c"
				}
			}
		},
		extend: {
			borderWidth: {
				1: "1px"
			},
			padding: {
				1.5: "0.375rem"
			},
			maxHeight: {
				26: "6.5rem"
			}
		}
	},
	plugins: [
		require("@tailwindcss/forms")
	]
};
