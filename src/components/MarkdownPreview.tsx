import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type MarkdownPreviewProps = {
	markdown: string
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
	return (
		<Markdown
			className="prose dark:prose-invert max-w-4xl md:text-lg"
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				code({ node, inline, className, children, ...props }: any) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						<SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
			}}
		>
			{markdown}
		</Markdown>
	)
}

export default MarkdownPreview