import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProductListing from './components/ProductListing';

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
      <ProductListing />

      <FeaturedCampaign />
      <StorySection />
      <StrangersSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
