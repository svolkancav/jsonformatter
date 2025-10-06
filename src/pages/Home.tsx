import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { WhyUse } from '../components/WhyUse';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';

export function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Features />
      <WhyUse />
      <Testimonials />
      <FAQ />
    </div>
  );
}
