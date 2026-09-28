import {
  HeartHandshake,
  Ruler,
  Scissors,
  Sparkles
} from "lucide-react";

const items = [
  {
    Icon: Scissors,
    title: "Custom Designs",
    text: "Stitching based on your style and design."
  },
  {
    Icon: Ruler,
    title: "Perfect Fitting",
    text: "Personalised fitting for comfortable wear."
  },
  {
    Icon: Sparkles,
    title: "Neat Stitching",
    text: "Careful finishing with attention to detail."
  },
  {
    Icon: HeartHandshake,
    title: "Personal Attention",
    text: "Friendly support from design to finish."
  }
];

export default function TrustSection() {
  return (
    <section className="border-y border-violet-100 bg-white py-10">

      <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {items.map(
          ({
            Icon,
            title,
            text
          }) => (
            <div
              key={title}
              className="rounded-2xl bg-violet-50/60 p-5"
            >
              <Icon
                className="text-violet-600"
                size={24}
              />

              <h3 className="mt-3 font-bold text-violet-950">
                {title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {text}
              </p>
            </div>
          )
        )}

      </div>

    </section>
  );
}