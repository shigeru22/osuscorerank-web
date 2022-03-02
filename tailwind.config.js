module.exports = {
	content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
	theme: {
		fontFamily: {
			"sans": [ "Montserrat", "ui-sans-serif", "sans-serif" ],
			"mono": [ "Source Code Pro", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace" ]
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
			},
			success: {
				light: "#008f18",
				dark: "#00b21d"
			},
			warn: {
				light: "#c3b900",
				dark: "#f6ea00"
			},
			debug: {
				light: "#7b7b7b",
				dark: "#d4d4d4"
			}
		},
		extend: {
			borderWidth: {
				1: "1px"
			},
			padding: {
				1.25: "0.3125rem",
				1.5: "0.375rem",
				13: "3.25rem"
			},
			maxHeight: {
				4.625: "18.5rem",
				26: "6.5rem",
				150: "37.4rem"
			},
			lineHeight: {
				42: "10.5rem"
			},
			width: {
				22: "5.5rem",
				54: "13.5rem"
			},
			height: {
				93: "23.25rem"
			},
			minWidth: {
				24: "6rem",
				28: "7rem",
				32: "8rem",
				48: "12rem",
				56: "14rem"
			},
			minHeight: {
				14: "3.5rem"
			},
			strokeWidth: {
				10: "10"
			}
		}
	},
	darkMode: "class",
	plugins: [
		require("@tailwindcss/forms")
	]
};
