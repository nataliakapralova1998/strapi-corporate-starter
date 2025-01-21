import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  return (
    <section className="rich-text py-6 text-text">
      <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
