import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Markdown remarkPlugins={[remarkGfm]}>
          {data.body}
        </Markdown>
      </div>
    </section>
  );
}
