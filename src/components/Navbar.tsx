import { Link } from "react-router-dom"
import Button from "./Button"


const Navbar = () => {
  return (
    <nav className="px-4 py-2 border flex items-center">
      <h1 className="text-2xl">
        <Link to='/'>
          My Notes
        </Link>
      </h1>
      <div className="ml-auto">
        <Link to='/create'
          className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-white mr-4"
        >Create</Link>
      </div>
    </nav>
  )
}

export default Navbar