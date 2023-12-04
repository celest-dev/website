import React from "react";
import LandingPage from "../components/LandingPage/LandingPage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - The Flutter cloud platform`}
      description="The Flutter cloud platform"
    >
      <main>
        <LandingPage />
      </main>
    </Layout>
  );
}
