import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto mt-2 mb-8 px-2 md:px-3">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout