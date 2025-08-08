import React from "react";
import Layout from "../../components/layout/Layout";
import TechnologyHero from "../../components/technologyPage/TechnologyHero";
import TechnologyCards from "../../components/technologyPage/TechnologyCards";
import TechnologyReputation from "../../components/technologyPage/TechnologyReputation";
import TechnologyInfo from "../../components/technologyPage/TechnologyInfo";

const TechnologyPage = () => {
  return (
    <Layout>
      <TechnologyHero />
      <TechnologyCards />
      <TechnologyReputation />
      <TechnologyInfo />
    </Layout>
  );
};

export default TechnologyPage;
