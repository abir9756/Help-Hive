import {
  CalendarPlus,
  Users,
  ChartNoAxesCombined,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: CalendarPlus,
    title: "Create Events",
    description:
      "Organize social service events and bring people together to make a positive impact in your community.",
    number: "01",
  },
  {
    icon: Users,
    title: "Join Communities",
    description:
      "Discover meaningful events around you and connect with people who share your passion for helping others.",
    number: "02",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track Your Impact",
    description:
      "Keep track of the events you join, your contributions, and the difference you make over time.",
    number: "03",
  },
  {
    icon: HeartHandshake,
    title: "Make a Difference",
    description:
      "Turn small acts of kindness into meaningful change through teamwork and community support.",
    number: "04",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-brand-surface px-5 py-16 md:px-10 md:py-20 lg:px-20">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold tracking-wider text-brand-ink">
            WHAT YOU CAN DO
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-brand-ink md:text-5xl">
            Everything You Need to
            <span className="text-brand-accent"> Make an Impact</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-brand-muted md:text-lg">
            HelpHive makes it easier to organize events, find volunteers,
            and create positive change together.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand-accent/40 hover:shadow-[0_24px_45px_-32px_rgba(10,61,43,0.5)]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand-ink transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon size={27} aria-hidden="true" />
                  </div>

                  <span className="text-sm font-semibold text-brand-muted/40">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-brand-ink">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-brand-muted">
                  {feature.description}
                </p>

                <div className="mt-7 flex items-center text-sm font-semibold text-brand-ink">
                  Explore feature
                  <ArrowUpRight
                    size={17}
                    className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </div>

                <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-brand-soft/60 transition-transform duration-300 group-hover:scale-150" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
