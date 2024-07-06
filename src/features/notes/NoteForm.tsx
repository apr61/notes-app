import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { Editor } from "@monaco-editor/react";
import { NoteDataType, NoteType } from "../../context/Notes";
import toast from "react-hot-toast";
import MarkdownPreview from "../../components/MarkdownPreview";
import TagsSelect from "../tags/TagsSelect";
import SelectedTagsList from "../tags/SelectedTags";
import { useAuth } from "../../hooks/useSAuth";

type NoteFormProps = {
  onSubmit: (data: NoteDataType) => Promise<void>;
} & Partial<NoteType>;

const NoteForm = ({
  onSubmit,
  title: editTitle = "",
  markdown: editMarkdown = "",
  tagIds = [],
}: NoteFormProps) => {
  const [title, setTitle] = useState<string>(editTitle);
  const [markdown, setMarkdown] = useState<string | undefined>(editMarkdown);
  const [selectedTags, setSelectedTags] = useState<string[]>(tagIds);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("..");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (markdown?.trim().length === 0) {
      toast.error("Note can't be empty");
      return;
    }
    if (selectedTags.length === 0) {
      toast.error("Tags must be selected");
      return;
    }
    onSubmit({
      title: title,
      markdown: markdown as string,
      tagIds: selectedTags,
      userId: currentUser?.uid as string,
    });
  };

  const handleEditorText = (value: string | undefined) => {
    setMarkdown(value);
  };

  const handleRemoveTag = (id: string) => {
    setSelectedTags((prev) => prev.filter((tagId) => tagId !== id));
  };

  const alertUser = (e: any) => {
    if (markdown && markdown.trim().length > 0) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [markdown]);

  return (
    <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <div className="flex flex-col md:flex-row gap-2 max-w-[70rem] w-full">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              name="title"
              className="w-full border rounded-md border-gray-200 px-3 py-2 dark:bg-black dark:border-gray-800"
              autoFocus={true}
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title of note..."
              required
            />
          </div>
          <div className="flex gap-2 flex-wrap w-full md:w-1/2">
            <TagsSelect
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              required={true}
            />
          </div>
        </div>
        <div className="flex gap-2 md:ml-auto self-start md:self-center">
          <Button
            type="submit"
            btnType="primary"
            className="py-2 lg:px-6 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </Button>
          <Button btnType="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
      <SelectedTagsList
        selectedTags={selectedTags}
        handleRemoveTag={handleRemoveTag}
      />
      <div className="flex flex-row-reverse gap-2 w-fit">
        <label htmlFor="show-preview" className="cursor-pointer text-lg">
          Show preview
        </label>
        <input
          type="checkbox"
          checked={showPreview}
          id="show-preview"
          onChange={() => setShowPreview((prev) => !prev)}
        />
      </div>
      <div className="h-[70vh] mt-4 overflow-y-auto px-4">
        {showPreview ? (
          <div className="max-w-6xl w-full mx-auto ">
            <MarkdownPreview markdown={markdown as string} />
          </div>
        ) : (
          <Editor
            height="70vh"
            defaultValue={markdown}
            onChange={handleEditorText}
            defaultLanguage="markdown"
            theme="vs-dark"
          />
        )}
      </div>
    </form>
  );
};

export default NoteForm;
