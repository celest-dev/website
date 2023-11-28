import React from "react";
import LandingPage from "../components/LandingPage/LandingPage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="A managed cloud platform for Flutter and Dart <head />"
    >
      <main>
        <LandingPage />
      </main>
    </Layout>
  );
}
