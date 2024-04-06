import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

type MarkdownPreviewProps = {
    markdown: string
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
    return (
        <Markdown className="prose" remarkPlugins={[remarkGfm]}>
            {markdown}
        </Markdown>
    )
}

export default MarkdownPreview