import SectionHeading from "@/components/SectionHeading";

const features = [
  {
    number: "01",
    title: "Thoughtful Tailoring",
    text: "Every outfit is stitched with attention to detail, keeping your style, comfort and preferred look in mind.",
  },
  {
    number: "02",
    title: "Personal Fit",
    text: "We focus on careful measurements and fitting so your outfit feels comfortable and looks beautifully finished.",
  },
  {
    number: "03",
    title: "Beautiful Finishing",
    text: "From the first stitch to the final adjustment, we take care of the small details that make an outfit feel special.",
  },
];

export default function About() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-rose-50">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />

        <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50">
  {/* Background decoration */}
  <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-purple-200/30 blur-3xl sm:h-72 sm:w-72" />

  <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl sm:h-80 sm:w-80" />

  {/* Small decorative dots */}
  <div className="pointer-events-none absolute left-[8%] top-24 h-2.5 w-2.5 rounded-full bg-violet-300/70 sm:h-3 sm:w-3" />

  <div className="pointer-events-none absolute right-[12%] top-32 h-2 w-2 rounded-full bg-purple-400/60" />

  <div className="pointer-events-none absolute bottom-16 left-[15%] h-2 w-2 rounded-full bg-violet-400/50" />

  <div className="container-custom relative px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">

    <div className="mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">

      {/* =========================
          LEFT CONTENT
      ========================== */}
      <div className="text-center lg:text-left">

        {/* Small label */}
        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:px-4">

          <span className="shrink-0 text-sm">
            🧵
          </span>

          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-700 sm:text-xs sm:tracking-[0.22em]">
            About Malathi Designer
          </span>

          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />

        </div>


        {/* Main heading */}
        <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-violet-950 sm:text-4xl md:text-5xl lg:text-6xl">

          Crafted With Care,

          <span className="mt-1.5 block bg-gradient-to-r from-violet-700 via-purple-600 to-violet-500 bg-clip-text text-transparent sm:mt-2">
            Made For You
          </span>

        </h1>


        {/* Decorative line */}
        <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">

          <div className="h-px w-8 bg-violet-300 sm:w-12" />

          <span className="text-xs text-violet-500 sm:text-sm">
            ✦
          </span>

          <div className="h-px w-8 bg-violet-300 sm:w-12" />

        </div>


        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">

          At Malathi Designer, every stitch is created with care,
          attention and a love for beautiful fitting. We create
          outfits that reflect your style, feel comfortable and
          make you feel confident.

        </p>


        {/* Highlight tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3 lg:justify-start">

          <div className="rounded-full bg-white px-3 py-2 text-xs font-medium text-violet-800 shadow-sm ring-1 ring-violet-100 sm:px-4 sm:text-sm">
            ✨ Personal Style
          </div>

          <div className="rounded-full bg-white px-3 py-2 text-xs font-medium text-violet-800 shadow-sm ring-1 ring-violet-100 sm:px-4 sm:text-sm">
            🧵 Perfect Fit
          </div>

          <div className="rounded-full bg-white px-3 py-2 text-xs font-medium text-violet-800 shadow-sm ring-1 ring-violet-100 sm:px-4 sm:text-sm">
            💜 Made With Care
          </div>

        </div>

      </div>


      {/* =========================
          RIGHT IMAGE
      ========================== */}
      <div className="relative mx-auto mt-4 w-full max-w-[300px] sm:mt-2 sm:max-w-[340px] lg:mt-0 lg:max-w-[380px]">

        {/* Glow */}
        <div className="absolute -inset-4 rounded-[2.5rem] bg-violet-200/40 blur-2xl sm:-inset-5 sm:rounded-[3rem]" />


        {/* Main card */}
        <div className="relative overflow-visible rounded-[2rem] border border-white/80 bg-white p-2.5 shadow-xl sm:rounded-[2.5rem] sm:p-3 sm:shadow-2xl">

          {/* Image */}
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">

            <img
              src="/images/about-tailoring.jpg"
              alt="Beautiful tailoring design by Malathi Designer"
              className="h-[350px] w-full object-cover object-center sm:h-[420px]"
            />


            {/* Image gradient */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-violet-950/85 via-violet-950/20 to-transparent p-5 pt-24 sm:p-6 sm:pt-28">

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-violet-100 sm:text-xs sm:tracking-[0.2em]">
                The Art of Stitching
              </p>

              <h2 className="mt-1.5 text-xl font-bold text-white sm:mt-2 sm:text-2xl">
                Every Stitch Matters
              </h2>

            </div>

          </div>


          {/* Floating card */}
          <div className="absolute -bottom-4 -left-3 rounded-xl border border-violet-100 bg-white px-3 py-2.5 shadow-lg sm:-bottom-5 sm:-left-5 sm:rounded-2xl sm:px-5 sm:py-4">

            <div className="flex items-center gap-2 sm:gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-base sm:h-10 sm:w-10 sm:text-xl">
                🪡
              </div>

              <div>
                <p className="text-[9px] text-slate-500 sm:text-xs">
                  Made with
                </p>

                <p className="text-xs font-semibold text-violet-950 sm:text-sm">
                  Love & Detail
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Floating thread icon */}
        <div className="absolute -right-3 -top-4 flex h-12 w-12 rotate-12 items-center justify-center rounded-full border border-violet-200 bg-white text-xl shadow-lg sm:-right-5 sm:-top-5 sm:h-16 sm:w-16 sm:text-2xl">
          🧵
        </div>

      </div>

    </div>

  </div>
</section>
      </section>


      {/* INTRODUCTION */}
      <section className="section-padding bg-white">
        <div className="container-custom">

         <div className="mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12">

  {/* TEXT */}
  <div className="w-full text-center lg:text-left">

    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
      Our Story
    </p>

    <h2 className="mt-3 text-3xl font-bold leading-tight text-violet-950 sm:text-4xl">
      Tailoring with care,
      <span className="block">
        made especially for you.
      </span>
    </h2>

    <div className="mx-auto mt-5 max-w-2xl space-y-4 text-[15px] leading-7 text-slate-600 sm:mt-6 sm:text-[16px] sm:leading-8 lg:mx-0">
      <p>
        Every woman has her own style. At Malathi Designer, we
        understand that your outfit should feel like it was made
        especially for you.
      </p>

      <p>
        From everyday outfits to special occasions, we provide
        ladies tailoring, custom fitting and alterations with
        attention to detail and comfort.
      </p>

      <p>
        Our goal is simple — to help you feel comfortable,
        confident and happy in what you wear.
      </p>
    </div>

    {/* BADGES */}
    <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:mt-8 sm:gap-3 lg:justify-start">

      <span className="rounded-full bg-violet-50 px-4 py-2 text-xs font-medium text-violet-800 sm:px-5 sm:py-2.5 sm:text-sm">
        ✨ Personal Style
      </span>

      <span className="rounded-full bg-rose-50 px-4 py-2 text-xs font-medium text-rose-700 sm:px-5 sm:py-2.5 sm:text-sm">
        🧵 Careful Stitching
      </span>

      <span className="rounded-full bg-violet-50 px-4 py-2 text-xs font-medium text-violet-800 sm:px-5 sm:py-2.5 sm:text-sm">
        💜 Comfortable Fit
      </span>

    </div>

  </div>


  {/* VISUAL CARD */}
  <div className="relative mx-auto w-full max-w-xl">

    {/* GLOW */}
    <div className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-violet-100 to-rose-100 blur-2xl opacity-70 sm:-inset-4 sm:rounded-[2rem]" />

    {/* CARD */}
    <div className="relative overflow-hidden rounded-[1.5rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-rose-50 p-5 shadow-xl sm:rounded-[2rem] sm:p-8 lg:p-10">

      <div className="flex min-h-[320px] flex-col items-center justify-center text-center sm:min-h-[360px]">

        {/* ICON */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-lg sm:h-24 sm:w-24 sm:text-5xl">
          🧵
        </div>

        {/* TITLE */}
        <h3 className="mt-6 text-xl font-bold text-violet-950 sm:mt-7 sm:text-2xl">
          The Art of Tailoring
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
          Every measurement, every cut and every stitch comes
          together to create an outfit that feels uniquely yours.
        </p>

        {/* DIVIDER */}
        <div className="mt-6 h-px w-16 bg-rose-300 sm:mt-7 sm:w-20" />

        {/* BOTTOM TEXT */}
        <p className="mt-4 text-xs font-medium tracking-wide text-rose-500 sm:mt-5 sm:text-sm">
          Crafted with care • Made for you
        </p>

      </div>

    </div>

  </div>

</div>

        </div>
      </section>


      {/* WHAT WE DO */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">

          <SectionHeading
            eyebrow="What We Do"
            title="More Than Just Stitching"
            description="We pay attention to the details that make your outfit comfortable, beautiful and personal."
          />

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">

  {features.map((feature) => (
    <div
      key={feature.number}
      className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >

      {/* NUMBER CIRCLE */}
      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-50 text-sm font-bold text-violet-700 transition group-hover:bg-violet-100">
          {feature.number}
        </div>

      </div>

      {/* TITLE */}
      <h3 className="mt-7 text-xl font-bold text-violet-950">
        {feature.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-3 leading-7 text-slate-600">
        {feature.text}
      </p>

    </div>
  ))}

</div>

        </div>
      </section>


      {/* VALUES */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <div className="mx-auto max-w-4xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              Why We Care
            </p>

            <h2 className="mt-3 text-3xl font-bold text-violet-950 sm:text-4xl">
              Your Outfit. Your Comfort. Your Style.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              Good tailoring is about more than measurements. It is about
              understanding what you like, paying attention to the details
              and creating something you feel confident wearing.
            </p>

          </div>


          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">

            <div className="rounded-2xl bg-violet-50 p-7 text-center">
              <div className="text-3xl">💜</div>

              <h3 className="mt-4 font-bold text-violet-950">
                Personal
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Designs and fitting based on your preferences.
              </p>
            </div>


            <div className="rounded-2xl bg-rose-50 p-7 text-center">
              <div className="text-3xl">🧵</div>

              <h3 className="mt-4 font-bold text-violet-950">
                Careful
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Attention to stitching and finishing details.
              </p>
            </div>


            <div className="rounded-2xl bg-violet-50 p-7 text-center">
              <div className="text-3xl">✨</div>

              <h3 className="mt-4 font-bold text-violet-950">
                Comfortable
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Outfits designed to feel as good as they look.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* FINAL MESSAGE */}
      <section className="relative overflow-hidden bg-gradient-to-r from-violet-950 to-violet-900">
        <div className="container-custom px-4 py-16 sm:py-20">

          <div className="mx-auto max-w-3xl text-center">

            <div className="text-3xl">
              🧵 ✨ 💜
            </div>

            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              Wear Something That Feels Like You
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-violet-100">
              Because the best outfit is not just the one that looks
              beautiful — it is the one that makes you feel confident,
              comfortable and completely yourself.
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}