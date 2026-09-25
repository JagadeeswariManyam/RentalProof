import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import TrustValueStrip from '../components/landing/TrustValueStrip';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import BeforeAfterSection from '../components/landing/BeforeAfterSection';
import AIObservationSection from '../components/landing/AIObservationSection';
import RolesSection from '../components/landing/RolesSection';
import SecuritySection from '../components/landing/SecuritySection';
import TimelineSection from '../components/landing/TimelineSection';
import CTASection from '../components/landing/CTASection';
import LandingFooter from '../components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-brand-500 selection:text-white antialiased overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Premium Navbar with Theme Toggle */}
      <Navbar />

      {/* 2 & 3. Hero Section + 3D Property Cinematic Experience */}
      <HeroSection />

      {/* 4. Trust / Value Strip */}
      <TrustValueStrip />

      {/* 5. Six Structurally Unique Feature Cards (3D Orbital / Dedicated Card Architectures) */}
      <FeatureSection />

      {/* 6. How It Works Section */}
      <HowItWorksSection />

      {/* 7. Before & After Section (Continuous Auto-Animated Comparison Slider) */}
      <BeforeAfterSection />

      {/* 8. AI-Assisted Observation Section (Visual Variance Scan + Maintenance/Deposit Integration) */}
      <AIObservationSection />

      {/* 9. Roles Section */}
      <RolesSection />

      {/* 10. Security / Trust Section */}
      <SecuritySection />

      {/* 11. Rental Timeline */}
      <TimelineSection />

      {/* 12. Final CTA */}
      <CTASection />

      {/* 13. Footer */}
      <LandingFooter />

    </div>
  );
};

export default LandingPage;
