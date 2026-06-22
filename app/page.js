import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ChaptersSection from './components/ChaptersSection';
import FeaturedCampaign from './components/FeaturedCampaign';
import StrangersSection from './components/StrangersSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StorySection />
      <ChaptersSection />
      <FeaturedCampaign />
      <StrangersSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
