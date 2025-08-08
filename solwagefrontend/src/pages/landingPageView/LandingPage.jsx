import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/landingPage/HeroSection";
import BenefitsSection from "../../components/landingPage/BenefitsSection";
import HowItWorksSection from "../../components/landingPage/HowItWorksSection";

const LandingPage = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
    </Layout>
  );
};

export default LandingPage;
