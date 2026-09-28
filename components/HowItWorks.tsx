import {
  CheckCircle2
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";

const steps = [
  "Share Your Design",
  "Choose Your Stitching",
  "Get Your Measurements",
  "Receive Your Finished Outfit"
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-violet-50/60">

      <div className="container-custom">

        <SectionHeading
          eyebrow="Simple Process"
          title="How It Works"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-4">

          {steps.map(
            (step, index) => (
              <div
                key={step}
                className="premium-card p-6"
              >
                <CheckCircle2 className="text-violet-600" />

                <p className="mt-5 text-xs font-bold uppercase tracking-widest text-violet-500">
                  Step {index + 1}
                </p>

                <h3 className="mt-2 font-bold text-violet-950">
                  {step}
                </h3>
              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}