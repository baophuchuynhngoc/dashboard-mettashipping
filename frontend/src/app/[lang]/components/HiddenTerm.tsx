import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function HiddenTerm({ data,isOpen }: any) {
  return (
    <div className="mb-8">
      <Markdown children={data.element} remarkPlugins={[remarkGfm]} />
    </div>
  );
}
