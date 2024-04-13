import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MainLayout from "./layouts/MainLayout"
import CreateNote from "./pages/CreateNote"
import ShowNote from "./pages/ShowNote"
import NotFound from "./components/NotFound"
import EditNote from "./pages/EditNote"
import { useAppDispatch } from "./app/hooks"
import { fetchAllTags } from "./features/tags/tagsSlice"
import { useEffect } from "react"

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchAllTags())
	}, [])
	
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path="/" index element={<Home />} />
				<Route path="/:id" element={<ShowNote />} />
			</Route>
			<Route path="/create" index element={<CreateNote />} />
			<Route path="/:id/edit" element={<EditNote />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default App
