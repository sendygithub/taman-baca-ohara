import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Team } from "../components/Team";
import { Services } from "../components/Services";
import { Portfolio } from "../components/Portfolio";
import { Footer } from "../components/Footer";
import { OfficeParallax } from "../components/OfficeParallax";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <OfficeParallax />
      <Services />
      <Team />
      <Portfolio />
      <Footer />
    </div>
  );
}
