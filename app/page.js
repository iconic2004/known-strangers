import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ChaptersSection from './components/ChaptersSection';
import FeaturedCampaign from './components/FeaturedCampaign';
import StorySection from './components/StorySection';
import StrangersSection from './components/StrangersSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ChaptersSection />
      <FeaturedCampaign />
      <StorySection />
      <StrangersSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
