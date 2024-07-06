import { useAppSelector } from "../../app/hooks";
import { Button } from "../../components";
import { getTagById } from "./tagsSlice";

type SelectedTagsListProps = {
  selectedTags: string[];
  handleRemoveTag: (id: string) => void;
};

type SelectedTagsButtonProps = {
  tagId: string;
  handleRemoveTag: (id: string) => void;
};

const SelectedTagsList = ({
  selectedTags,
  handleRemoveTag,
}: SelectedTagsListProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {selectedTags?.map((tagId) => (
        <SelectedTagsButton
          key={tagId}
          tagId={tagId}
          handleRemoveTag={handleRemoveTag}
        />
      ))}
    </div>
  );
};

export default SelectedTagsList;

const SelectedTagsButton = ({
  tagId,
  handleRemoveTag,
}: SelectedTagsButtonProps) => {
  const tag = useAppSelector(getTagById(tagId));
  if (tag === undefined) return;
  return (
    <Button onClick={() => handleRemoveTag(tagId)}>
      {tag.tag}
      <span className="ml-1 text-lg font-bold">&times;</span>
    </Button>
  );
};
