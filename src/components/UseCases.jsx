import { useCasesContent as defaultContent } from "../content/useCasesContent";

export default function UseCases({ content = defaultContent }) {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">{content.heading}</h2>
      <p className="text-white/70 max-w-3xl">{content.description}</p>
    </section>
  );
}
