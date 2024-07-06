import { useState } from "react";
import { Button } from "../../components";
import toast from "react-hot-toast";
import { TagType } from "../../context/Tags";
import {
  addTag,
  deleteTag,
  editTag,
  getTagsStatus,
  selectAllTags,
} from "./tagsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

const TagsList = () => {
  const [value, setValue] = useState<string>("");
  const [edit, setEdit] = useState<TagType | undefined>(undefined);
  const [del, setDel] = useState<TagType | undefined>(undefined);

  const availableTags = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();
  const tagsStatus = useAppSelector(getTagsStatus);

  const handleAddOnClick = async () => {
    try {
      let res;
      if (value.trim().length === 0) {
        toast.error("New tag must be required...");
        return;
      }
      if (edit) {
        await dispatch(editTag({ id: edit.id, tag: value }));
        toast.success("Tag updated successfully");
        return;
      }
      res = await dispatch(addTag({ tag: value }));
      toast.success("Tag added successfully");
      unwrapResult(res);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setValue("");
      setEdit(undefined);
    }
  };

  const handleOnEdit = (id: string) => {
    const editingTag = availableTags.find((tag) => tag.id === id);
    if (editingTag) {
      setValue(editingTag.tag);
      setEdit(editingTag);
    }
  };

  const handleOnDelete = async (id: string) => {
    const delTag = availableTags.find((tag) => tag.id === id);
    if (delTag) {
      setDel(delTag);
      try {
        await dispatch(deleteTag(id));
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setDel(undefined);
        toast.success("Tag deleted successfully");
      }
    }
  };

  const content = availableTags.map((tag) => {
    return (
      <div className="flex gap-2 my-2" key={tag.id}>
        <input
          type="text"
          className="border dark:border-gray-800 p-2 rounded-md w-full dark:bg-black"
          value={tag.tag}
          readOnly={true}
        />
        <Button onClick={() => handleOnEdit(tag.id)} className="px-4">
          Edit
        </Button>
        <Button
          btnType="danger"
          onClick={() => handleOnDelete(tag.id)}
          loading={del?.id === tag.id && tagsStatus === "loading"}
          disabled={del?.id === tag.id && tagsStatus === "loading"}
          className="px-4"
        >
          Delete
        </Button>
      </div>
    );
  });

  const addButtonText = edit ? "Update" : "Add";

  return (
    <section>
      <h2 className="text-2xl">Tags</h2>
      <div className="my-2 flex gap-2 items-center">
        <input
          type="text"
          id="new-tag"
          className="border dark:border-gray-800 p-2 rounded-md w-full dark:bg-black"
          placeholder="New Tag"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={handleAddOnClick}
          className="px-4 py-2"
          loading={!del && tagsStatus === "loading"}
          disabled={!del && tagsStatus === "loading"}
        >
          {addButtonText}
        </Button>
      </div>
      <h3 className="text-lg">Available Tags</h3>
      <div className="my-2 h-[20rem] overflow-y-scroll shadow-inner dark:shadow-slate-800">
        {content}
      </div>
    </section>
  );
};

export default TagsList;
