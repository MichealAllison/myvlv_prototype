import { Nav } from '@/components/Nav';
import { ViewSwitcher } from '@/components/view/ViewSwitcher';
import { IntroExperience } from '@/components/intro/IntroExperience';
import { NewsletterModal } from '@/components/newsletter/NewsletterModal';
import { ViewProvider } from '@/lib/view/ViewContext';

export default function HomePage() {
  return (
    <ViewProvider>
      <IntroExperience>
        <Nav />
        <ViewSwitcher />
        <NewsletterModal />
      </IntroExperience>
    </ViewProvider>
  );
}
