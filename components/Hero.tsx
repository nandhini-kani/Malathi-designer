import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#d19ffa]">

      {/* BACKGROUND GLOW */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />


      <div className="container-custom relative">

        <div
          className="
            grid
            min-h-[calc(100vh-5rem)]
            items-center
            gap-10
            px-4
            py-10
            sm:gap-12
            sm:px-6
            sm:py-14
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-12
            lg:px-0
            lg:py-20
          "
        >

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="fade-up text-center lg:text-left">

            {/* BADGE */}
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-purple-200
                bg-white/75
                px-3
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#6D28D9]
                shadow-sm
                sm:mb-6
                sm:px-4
                sm:text-xs
                sm:tracking-[0.16em]
              "
            >
              <Sparkles size={14} />
              Custom Tailoring • Namakkal
            </div>


            {/* HEADING */}
            <h1
              className="
                mx-auto
                max-w-3xl
                text-4xl
                font-black
                leading-[1.05]
                tracking-[-0.04em]
                text-[#35204F]
                sm:text-5xl
                sm:leading-[1.02]
                md:text-6xl
                lg:mx-0
                lg:text-7xl
              "
            >
              Your Style,

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#6D28D9]
                  via-[#7C3AED]
                  to-[#8B5CF6]
                  bg-clip-text
                  text-transparent
                "
              >
                Perfectly Stitched.
              </span>
            </h1>


            {/* DESCRIPTION */}
            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-[#665873]
                sm:mt-7
                sm:text-base
                sm:leading-8
                lg:mx-0
                lg:text-lg
              "
            >
              Beautifully crafted outfits, personalised fitting
              and thoughtful stitching designed to make every
              piece feel uniquely yours.
            </p>


            {/* =====================================================
                BUTTONS
            ===================================================== */}
           <div
  className="
    mt-7
    grid
    w-full
    grid-cols-1
    gap-3
    sm:mt-9
    sm:grid-cols-2
    lg:flex
    lg:flex-wrap
    lg:justify-start
  "
>
  {/* SERVICES BUTTON */}
  <Link
    href="/services"
    className="
      inline-flex
      min-h-[52px]
      w-full
      items-center
      justify-center
      gap-2
      rounded-full
      bg-gradient-to-r
      from-[#6D28D9]
      to-[#7C3AED]
      px-5
      py-3
      text-center
      text-sm
      font-bold
      text-white
      shadow-xl
      shadow-purple-200
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      sm:px-6
      lg:w-auto
      lg:min-w-[190px]
      lg:px-7
      lg:py-4
    "
  >
    <span>Explore Our Services</span>
    <ArrowRight size={18} className="shrink-0" />
  </Link>

  {/* WHATSAPP BUTTON */}
  <a
    href="https://wa.me/918248744594?text=Hi%20Malathi%20Designer%2C%20I%20would%20like%20to%20enquire%20about%20tailoring%20services."
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex
      min-h-[52px]
      w-full
      items-center
      justify-center
      gap-2
      rounded-full
      border
      border-purple-200
      bg-white
      px-5
      py-3
      text-center
      text-sm
      font-bold
      text-[#6D28D9]
      shadow-sm
      transition
      duration-300
      hover:-translate-y-1
      hover:border-purple-300
      hover:bg-purple-50
      hover:shadow-lg
      sm:px-6
      lg:w-auto
      lg:min-w-[190px]
      lg:px-7
      lg:py-4
    "
  >
    <MessageCircle size={18} className="shrink-0" />
    <span>Chat on WhatsApp</span>
  </a>

  {/* BOOK A STITCHING BUTTON */}
  <Link
    href="/contact"
    className="
      inline-flex
      min-h-[52px]
      w-full
      items-center
      justify-center
      gap-2
      rounded-full
      bg-gradient-to-r
      from-purple-600
      to-indigo-600
      px-5
      py-3
      text-center
      text-sm
      font-semibold
      text-white
      shadow-lg
      shadow-purple-200
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      sm:px-6
      lg:w-auto
      lg:min-w-[190px]
      lg:px-7
      lg:py-4
    "
  >
    <span>Book a Stitching</span>
    <ArrowRight size={18} className="shrink-0" />
  </Link>
</div>

            {/* =====================================================
                FEATURES
            ===================================================== */}
            <div
              className="
                mt-7
                flex
                flex-wrap
                justify-center
                gap-x-5
                gap-y-3
                text-xs
                text-[#766582]
                sm:mt-10
                sm:gap-x-6
                sm:text-sm
                lg:justify-start
              "
            >

              <span>
                <span className="mr-1 text-[#8B5CF6]">✦</span>
                Custom Designs
              </span>

              <span>
                <span className="mr-1 text-[#8B5CF6]">✦</span>
                Comfortable Fitting
              </span>

              <span>
                <span className="mr-1 text-[#8B5CF6]">✦</span>
                Personal Attention
              </span>

            </div>

          </div>


          {/* =====================================================
              RIGHT IMAGE
          ===================================================== */}
          <div
            className="
              relative
              mx-auto
              mt-2
              w-full
              max-w-[340px]
              sm:max-w-md
              lg:mt-0
              lg:max-w-xl
              lg:ml-auto
            "
          >

            {/* IMAGE GLOW */}
            <div
              className="
                absolute
                -inset-3
                rounded-[2rem]
                bg-gradient-to-br
                from-purple-200/40
                to-indigo-200/20
                blur-2xl
                sm:-inset-5
                sm:rounded-[3rem]
              "
            />


            {/* IMAGE OUTER CARD */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[1.8rem]
                border
                border-white/70
                bg-white/60
                p-2
                shadow-2xl
                sm:rounded-[2.5rem]
                sm:p-3
              "
            >

              {/* IMAGE */}
              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[1.4rem]
                  bg-purple-100
                  sm:rounded-[2rem]
                "
              >

                <Image
                  src="/images/hero-tailoring.jpg"
                  alt="Custom tailoring and dress stitching at Malathi Designer"
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 45vw"
                />


                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#35204F]/35 via-transparent to-transparent" />


                {/* IMAGE TEXT CARD */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">

                  <div
                    className="
                      glass
                      float-soft
                      rounded-xl
                      p-3
                      shadow-xl
                      sm:rounded-2xl
                      sm:p-4
                    "
                  >

                    <div className="text-sm font-bold text-[#35204F]">
                      Custom Stitching
                    </div>

                    <div className="mt-1 text-[11px] text-[#766582] sm:text-xs">
                      Made with care for you
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =====================================================
                FLOATING CARD
            ===================================================== */}
            <div
              className="
                absolute
                -right-2
                top-6
                hidden
                rounded-2xl
                border
                border-white/70
                bg-white/90
                p-3
                shadow-xl
                sm:block
                sm:-right-3
                sm:top-10
                sm:p-4
              "
            >

              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] sm:text-xs">
                Crafted
              </div>

              <div className="mt-1 text-xs font-bold text-[#35204F] sm:text-sm">
                With Care ✨
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}