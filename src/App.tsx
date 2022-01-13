import React from "react";
import logo from "./logo.svg";

function App() {
	return (
		<div className="text-center">
			<header className="flex flex-col justify-center items-center min-h-screen leading-normal text-3xl text-white bg-react-support">
				<img src={ logo } className="h-96 animate-spin-slow pointer-events-none" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="text-react-link underline"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
