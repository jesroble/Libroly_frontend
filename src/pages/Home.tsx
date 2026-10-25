import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import NewReleasesSection from '../components/sections/NewReleasesSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import FaqSection from '../components/sections/FaqSection';
import RandomBookSection from '../components/sections/RandomBookSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <NewReleasesSection />
      <RandomBookSection />
      <FaqSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;