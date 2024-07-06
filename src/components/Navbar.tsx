import { Link } from "react-router-dom";
import Button from "./Button";
import CustomModal from "./CustomModal";
import TagsList from "../features/tags/TagsList";
import { useDispatch } from "react-redux";
import {
  closeTagsModal,
  getTagsModal,
  openTagsModal,
} from "../features/tags/tagsSlice";
import { useAppSelector } from "../app/hooks";
import { useAuth } from "../hooks/useSAuth";
import { userLogout } from "../services/auth";

const Navbar = () => {
  const tagsModal = useAppSelector(getTagsModal);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  return (
    <>
      <nav className="p-4 border-b dark:border-b-gray-800 flex items-center">
        <h1 className="text-2xl">
          <Link to="/">My Notes</Link>
        </h1>
        {currentUser && (
          <div className="ml-auto flex gap-2 md:gap-4">
            <Link
              to="/create"
              className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 md:px-4 py-2 text-white"
            >
              Create
            </Link>
            <Button btnType="outline" onClick={() => dispatch(openTagsModal())}>
              Edit Tags
            </Button>
            <Button
              btnType="danger"
              className="px-4"
              onClick={() => userLogout()}
            >
              Logout
            </Button>
          </div>
        )}
      </nav>
      <CustomModal
        isOpen={tagsModal}
        closeHandle={() => dispatch(closeTagsModal())}
      >
        <TagsList />
      </CustomModal>
    </>
  );
};

export default Navbar;
