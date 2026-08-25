import { About } from '@/components/sections/About';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Footer } from '@/components/Footer';
import { NewsletterBand } from '@/components/newsletter/NewsletterBand';
import { NewsletterModal } from '@/components/newsletter/NewsletterModal';
import { Nav } from '@/components/Nav';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Ecosystem />
        <Services />
        <Testimonials />
        <WhyChooseUs />
        <Blog />
        <NewsletterBand />
        <Contact />
      </main>
      <Footer />
      <NewsletterModal />
    </>
  );
}
