import React from "react";
import LandingPage from "../components/LandingPage/LandingPage";
import Layout from "@theme/Layout";

export default function Home() {
  return (
    <Layout
      description="The Flutter cloud platform"
    >
      <main>
        <LandingPage />
      </main>
    </Layout>
  );
}
