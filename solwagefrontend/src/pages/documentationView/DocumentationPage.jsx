import React from "react";
import Layout from "../../components/layout/Layout";
import DocumentationHero from "../../components/documentationPage/DocumentationHero";
import DocumentationArchitecture from "../../components/documentationPage/DocumentationArchitecture";
import DocumentationStellar from "../../components/documentationPage/DocumentationStellar";
import DocumentationSoroban from "../../components/documentationPage/DocumentationSoroban";
import DocumentationIntegration from "../../components/documentationPage/DocumentationIntegration";

const DocumentationPage = () => {
  return (
    <Layout>
      <DocumentationHero />
      <DocumentationArchitecture />
      <DocumentationStellar />
      <DocumentationSoroban />
      <DocumentationIntegration />
    </Layout>
  );
};

export default DocumentationPage;
