import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MainLayout from "./layouts/MainLayout"
import CreateNote from "./pages/CreateNote"
import ShowNote from "./pages/ShowNote"


function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path="/" index element={<Home />} />
				<Route path="/create" index element={<CreateNote />} />
				<Route path="/:id" element={<ShowNote />} />
			</Route>
		</Routes>
	)
}

export default App
