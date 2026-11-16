import HeroSection from "@/components/banner";
import FeaturesSection from "@/components/Feature";
import UpcomingEventsPreview from "@/components/upcoming-events-preview";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <UpcomingEventsPreview />
    </div>
  );
}
