import React from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
import DisplayModalProvider from "./store/DisplayModalProvider";

function App() {
	return (
		<CartProvider>
			<DisplayModalProvider>
				<Header />
				<main>
					<Meals />
				</main>
			</DisplayModalProvider>
		</CartProvider>
	);
}

export default App;
