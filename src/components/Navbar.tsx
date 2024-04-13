import { Link } from "react-router-dom"
import Button from "./Button"
import CustomModal from "./CustomModal"
import TagsList from "../features/tags/TagsList"
import { useDispatch } from "react-redux"
import { closeTagsModal, getTagsModal, openTagsModal } from "../features/tags/tagsSlice"
import { useAppSelector } from "../app/hooks"

const Navbar = () => {
  const tagsModal = useAppSelector(getTagsModal)
  const dispatch = useDispatch()
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
            handleClick={() => dispatch(openTagsModal())}
            text="Edit Tags"
          />
        </div>
      </nav>
      <CustomModal isOpen={tagsModal} closeHandle={() => dispatch(closeTagsModal())}>
        <TagsList />
      </CustomModal>
    </>
  )
}

export default Navbar