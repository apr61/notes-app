import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="mt-8 grid place-content-center max-w-lg mx-auto min-h-[20rem] h-full border dark:border-gray-700 border-gray-300  rounded-md">
        <h1 className="text-3xl mb-8">404 | Not Found</h1>
        <Link to="/" className="text-blue-500 border border-blue-400 hover:bg-blue-500 hover:text-white px-4 py-2 w-fit rounded-md"> &lt; Go Back</Link>
    </div>
  )
}

export default NotFound