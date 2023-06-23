import Iframe from "react-iframe";
export default function EmbedLogin({ data }: any) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <iframe
        title="login"
        src={"https://mts.gofreight.co/login/" || ""}
        width={data.width || "100%"}
        height={data.height || "100%"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className=""
      />
    </section>
  );
}
