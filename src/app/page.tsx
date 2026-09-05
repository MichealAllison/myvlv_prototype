import { Nav } from '@/components/Nav';
import { HomeJourney } from '@/components/journey/HomeJourney';
import { IntroExperience } from '@/components/intro/IntroExperience';
import { NewsletterModal } from '@/components/newsletter/NewsletterModal';

/**
 * Homepage = the VLV scroll journey.
 * Movement 01 (loading / VLV ident) is the <IntroExperience> overlay; it keeps
 * the page mounted underneath and lifts away on first visit.
 */
export default function HomePage() {
  return (
    <IntroExperience>
      <Nav />
      <HomeJourney />
      <NewsletterModal />
    </IntroExperience>
  );
}
