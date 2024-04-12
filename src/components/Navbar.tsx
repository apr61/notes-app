import { Link } from "react-router-dom"
import Button from "./Button"
import useTags from "../hooks/useTags"
import CustomModal from "./CustomModal"
import TagsList from "../features/tags/TagsList"

const Navbar = () => {
  const { viewTagsModal, setViewTagsModal } = useTags()
  return (
    <>
      <nav className="px-4 py-2 border-b dark:border-b-gray-800 flex items-center">
        <h1 className="text-2xl">
          <Link to='/'>
            My Notes
          </Link>
        </h1>
        <div className="ml-auto flex gap-2 md:gap-4">
          <Link to='/create'
            className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 md:px-4 py-2 text-white"
          >Create</Link>
          <Button
            btnType="button"
            styles="py-2 px-2 md:px-4 rounded-md bg-white border-2 text-gray-500 hover:bg-gray-500 hover:text-white dark:border-0"
            handleClick={() => setViewTagsModal(true)}
            text="Edit Tags"
          />
        </div>
      </nav>
      <CustomModal isOpen={viewTagsModal} closeHandle={() => setViewTagsModal(false)}>
        <TagsList />
      </CustomModal>
    </>
  )
}

export default Navbar