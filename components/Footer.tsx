import Link from "next/link";

const primaryCategories = [
  "A-Line Kurti",
  "Alterations",
  "Umbrella Frock",
  "Panel Frock",
  "Pleated Frock",
  "Short Top",
  "Palazzo Pant",
  "Peplum Top",
];

export default function Footer() {
  return (
    <footer className="border-t border-violet-100 bg-violet-950 text-white">
      <div className="container-custom px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-10">

          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold sm:text-2xl">
              Malathi Designer
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-7 text-violet-100/80">
              Custom tailoring, blouse stitching, dress stitching,
              alterations and personalised fitting in Namakkal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold sm:text-lg">
              Quick Links
            </h4>

            <nav className="mt-4 flex flex-col items-center gap-3 text-sm text-violet-100/80 sm:items-start">
              <Link
                href="/services"
                className="transition-colors hover:text-white"
              >
                Services
              </Link>

              <Link
                href="/gallery"
                className="transition-colors hover:text-white"
              >
                Gallery
              </Link>

              <Link
                href="/offers"
                className="transition-colors hover:text-white"
              >
                Offers
              </Link>

              <Link
                href="/reviews"
                className="transition-colors hover:text-white"
              >
                Reviews
              </Link>

              <Link
                href="/contact"
                className="transition-colors hover:text-white"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Primary Category */}
          <div>
            <h4 className="text-base font-semibold sm:text-lg">
              Primary Category
            </h4>

            <nav className="mt-4 flex flex-col items-center gap-3 text-sm text-violet-100/80 sm:items-start">
              {primaryCategories.map((category) => (
                <Link
                  key={category}
                  href="/services"
                  className="transition-colors hover:text-white"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-base font-semibold sm:text-lg">
              Location
            </h4>

            <p className="mt-4 max-w-xs text-sm leading-7 text-violet-100/80">
              Kondamanayakkanpatti,
              <br />
              Namakkal, Tamil Nadu
            </p>

            <a
              href="tel:+918248744594"
              className="mt-3 text-sm text-violet-100/80 transition-colors hover:text-white"
            >
              +91 82487 44594
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs leading-6 text-violet-100/60 sm:px-6">
        © {new Date().getFullYear()} Malathi Designer.
        <span className="block sm:inline sm:ml-1">
          All rights reserved.
        </span>
      </div>
    </footer>
  );
}