import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MainLayout from "./layouts/MainLayout"
import CreateNote from "./pages/CreateNote"
import ShowNote from "./pages/ShowNote"
import NotFound from "./components/NotFound"
import EditNote from "./pages/EditNote"

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path="/" index element={<Home />} />
				<Route path="/:id" element={<ShowNote />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/create" index element={<CreateNote />} />
			<Route path="/:id/edit" element={<EditNote />} />
		</Routes>
	)
}

export default App
