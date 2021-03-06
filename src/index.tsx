import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/index.css";
import App from "./views/App";
import Country from "./views/pages/Country";
import Global from "./views/pages/Global";
import StarredSoon from "./views/pages/StarredSoon";
import Settings from "./views/pages/Settings";
import Help from "./views/pages/Help";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<div>
				<Routes>
					<Route path="/" element={ <App /> }>
						<Route index element={ <Country /> } />
						<Route path="/country" element={ <Country /> } />
						<Route path="/global" element={ <Global /> } />
						<Route path="/starred" element={ <StarredSoon /> } />
						<Route path="/settings" element={ <Settings /> } />
						<Route path="/help" element={ <Help /> } />
						<Route path="*" element={ <>404?</> } />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	</React.StrictMode>
);

/*
 * if you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
