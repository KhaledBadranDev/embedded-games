import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";
import Home from "./pages/Home";
import Scratch from "./pages/Scratch";
import Codesters from "./pages/Codesters";
import Admins from "./pages/Admins";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="Scratch" element={<Scratch />} />
				<Route path="Codesters" element={<Codesters />} />
				<Route path="Admins" element={<Admins />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
