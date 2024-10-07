import Link from "next/link";
import { HStack, Spacer } from "@chakra-ui/react";

import {
  Button,
  Text,
  VStack
} from '@chakra-ui/react';
import CodeBlock from "@components/landing/codeblock";
import { usePostHog } from "posthog-js/react";

import { FeatureShowcase } from "./FeatureShowcase";
import { PricingCards } from "./PricingCards";
import { Testimonials } from "./Testimonials";
import { WideInfo } from "./wideinfo";
import { FirebaseInfograph } from "./FirebaseInfograph";


import { DeveloperExperienceSection } from "./DeveloperExperience";
const codeBlock1 = `@cloud
Future<String> sayHello(String name) async {
  return 'Hello, $name!';
}`

const codeBlock2 = `@cloud
Future<String> sayHello(String name) async {
  return 'Hello, $name!';
}`


export default function Hero() {
  const posthog = usePostHog();
  return (
    <VStack spacing={10}>

      <section
        id="hero"
        className="text-center flex flex-col items-center justify-center"
      >
        {/* <YCLogo className="mt-4" /> */}
        <h1 className="text-4xl tracking-tighter font-extrabold md:text-5xl mt-8 mb-8" style={{ textShadow: '0px 0px 10px white' }}>
          Push your code to the stars
        </h1>
        <p className="text-lg md:text-xl mb-8">

        </p>
        <Link href="/docs/get-started">

        </Link>


        <CodeBlock code={codeBlock1} />
        <CodeBlock code={codeBlock2} />



      </section>

      <Button

        className="px-6"
        onClick={() => posthog.capture("cta_clicked", { location: "hero" })}
      >
        Get Started
      </Button>

      <FeatureShowcase />
      <PricingCards></PricingCards>
      <Testimonials />
      <DeveloperExperienceSection />
      <WideInfo />
      <FirebaseInfograph />
    </VStack>
  );
}





