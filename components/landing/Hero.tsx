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


import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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
        {/* <Link href="/docs/get-started"> */}

        {/* </Link> */}

{/* 
        <CodeBlock code={codeBlock1} />
        <CodeBlock code={codeBlock2} /> */}

      <Button

      className="px-6"
      onClick={() => posthog.capture("cta_clicked", { location: "hero" })}
      href="http://localhost:3000/docs/download"
      >
      Get Started
      </Button>

      </section>



      {/* Square 1 */}
      <DartInfoPage></DartInfoPage>
      

      {/* Square 2 */}
      <Square3/>
      <Square2/>
      {/* <DeveloperProductivity></DeveloperProductivity> */}

      {/* Square 3 */}

  

      {/* <PricingCards></PricingCards>
      <Testimonials />
      <DeveloperExperienceSection />
      <WideInfo />
      <FirebaseInfograph /> */}
    </VStack>
  );
}


import {  Container,  Grid,  Icon, } from "@chakra-ui/react";
import { FaBolt, FaCog, FaDatabase, FaFire, FaLock, FaRocket, FaStream } from "react-icons/fa";

const FeatureCard1 = ({ icon, title, description }) => (
    <Box bg={useColorModeValue("rgba(31, 41, 55, 0.4)", "rgba(17, 17, 17, 0.1)")} // Semi-transparent background
        backdropFilter="blur(5px)" // Apply the blur effect
        p={6} borderRadius="lg" height="100%">
        <VStack align="start" spacing={4}>
            <Icon as={icon} boxSize={12} color="green.300" />
            <Heading size="lg">{title}</Heading>
            <Text>{description}</Text>
        </VStack>
    </Box>
);
const SmallFeature1 = ({ icon, title, description }) => (
    <Flex align="center">
        <Icon as={icon} boxSize={8} color="green.300" mr={4} />
        <VStack align="start" spacing={1}>
            <Heading size="sm">{title}</Heading>
            <Text fontSize="sm">{description}</Text>
        </VStack>
    </Flex>

);

export function FeatureShowcase1() {
    return (
        <Container maxW="container.xl" py={16}>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={16}>
                <FeatureCard1
                    icon={FaFire}
                    title="Dart Cloud Functions"
                    description="---" />
                <FeatureCard1
                    icon={FaDatabase}
                    title="Flutter On the Server"
                    description="---" />
                <FeatureCard1
                    icon={FaStream}
                    title="Server Side Widgets"
                    description="---" />
              </Grid>
            {/* <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
                <SmallFeature1
                    icon={FaBolt}
                    title="Hot Reloading"
                    description="Make code changes and see them live in milliseconds while maintaining the current state." />
                <SmallFeature1
                    icon={FaCog}
                    title="Logs and Metrics"
                    description="Gain insights into your application’s performance with integrated logging and metrics." />
                <SmallFeature1
                    icon={FaLock}
                    title="HIPAA Compliant"
                    description="Ensure your application meets HIPAA security standards with built-in compliance." />
                <SmallFeature1
                    icon={FaRocket}
                    title="Easy to Get Started"
                    description="Start quickly with a streamlined setup process that takes you from zero to deployment." />
                <SmallFeature1
                    icon={FaRocket}
                    title="Easy to Get Started"
                    description="Start quickly with a streamlined setup process that takes you from zero to deployment." />
                <SmallFeature1
                    icon={FaRocket}
                    title="Easy to Get Started"
                    description="Start quickly with a streamlined setup process that takes you from zero to deployment." />
            </Grid> */}
        </Container>
    );
}




import { useState } from "react";

const frontendCode = `
// Frontend.dart
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await turso.execute("SELECT * FROM users");

await turso.execute({
  sql: "SELECT * FROM users WHERE id = ?",
  args: [1],
});
`;

const backendCode = `
// Backend.dart

 
 
 
 
 

 

 
 
 
 
`;

export const Square2 = () => {
    const [activeCode, setActiveCode] = useState("frontend");

    const handleCodeSwitch = (codeType) => {
        setActiveCode(codeType);
    };

    return (
        <Box  bg="rgba(255, 255, 255, 0.1)" w={1000} color="white" py={10} px={8}>
            <HStack maxW="container.xl" mx="auto" spacing={10} align="center">
                {/* Left side: Text and buttons */}
                <VStack align="start" spacing={6} maxW="sm">
                    <Heading fontSize="4xl">Developer Productivity</Heading>
                    <Text fontSize="lg">
                        Turn your frontend developers into full stack developers.
                    </Text>
                    <Text fontSize="md" opacity={0.7}>
                    With Celest, developers can seamlessly transition between 
                    building beautiful user interfaces with Flutter and creating robust 
                    backend services. This unified approach significantly 
                    increases productivity and reduces the learning curve, allowing your 
                    team to deliver end-to-end solutions more efficiently than ever before.
                    </Text>
                </VStack>

                <Spacer />

                {/* Right side: Code Block and Buttons */}
                <Box
                    bg="gray.800"
                    p={6}
                    borderRadius="lg"
                    boxShadow="lg"
                    borderColor="gray.700"
                    borderWidth="1px"
                >
                    <HStack mb={4} spacing={4} w="100%" justifyContent="center">
                        <Button
                            colorScheme={activeCode === "frontend" ? "teal" : "gray"}
                            onClick={() => handleCodeSwitch("frontend")}
                        >
                            Frontend
                        </Button>
                        <Button
                            colorScheme={activeCode === "backend" ? "teal" : "gray"}
                            onClick={() => handleCodeSwitch("backend")}
                        >
                            Backend
                        </Button>
                    </HStack>

                    <HStack w="100%">
                        {/* Conditionally render the selected code block */}
                        {activeCode === "frontend" ? (
                            <CodeBlock code={frontendCode} />
                        ) : (
                            <CodeBlock code={backendCode} />
                        )}
                    </HStack>
                </Box>
            </HStack>
        </Box>
    );
};
import { useEffect } from "react";
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";

// Create an observable object to track the glow effect
const glowState$ = observable({ hasGlow: false });

// Frontend and Backend code
const HotreloadCode1 = `
BoxShadow(blurRadius: 10)
`;

const HotreloadCode2 = `
BoxShadow(blurRadius: 0)
`;

// Component that swaps between frontend and backend code blocks
export const Square3 = observer(function Square3() {
    // Manage the active code block state (frontend/backend)
    const [activeCode, setActiveCode] = useState("HotreloadCode1");

    // glow is automatically tracked for changes
    const hasGlow = glowState$.hasGlow.get();

    // Function to simulate hot-reload by toggling the glow effect
    const toggleGlow = () => {
        glowState$.hasGlow.set((prev) => !prev);
    };

    // Auto change the glow effect every few seconds to simulate hot-reload
    useEffect(() => {
        const interval = setInterval(toggleGlow, 2000); // Toggle every 2 seconds
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    // Conditional boxShadow for glow effect
    const boxShadowStyle = hasGlow
        ? "0px 0px 20px white" // Glow effect
        : "none"; // No glow

    // Function to handle switching code blocks
    const handleCodeSwitch = (codeType) => {
        setActiveCode(codeType);
    };

    return (
        <Box
            // bg="gray.900"
             bg="rgba(255, 255, 255, 0.1)"
            w={1000}
            color="white"
            py={10}
            px={8}
            // Apply the boxShadow dynamically based on the glow state
            boxShadow={boxShadowStyle}
            transition="box-shadow 0.3s ease-in-out"
        >
            <HStack maxW="container.xl" mx="auto" spacing={10} align="center">
                {/* Left side: Code Block */}
                <Box
                    bg="gray.800"
                    p={6}
                    borderRadius="lg"
                    boxShadow="lg"
                    borderColor="gray.700"
                    borderWidth="1px"
                >
      

                    <Box p={4} bg="gray.700" color="white" borderRadius="md">
                        <Text fontSize="md" fontFamily="monospace">
                            {/* Conditionally render the selected code block */}
              
                            {glowState$.hasGlow.get() === true ? <CodeBlock code={HotreloadCode1} /> : <CodeBlock code={HotreloadCode2} />}


                            {/* {activeCode === "HotreloadCode1" ? frontendCode : backendCode} */}
                        </Text>
                    </Box>
                </Box>

                <Spacer />

                {/* Right side: Text content */}
                <VStack align="start" spacing={6} maxW="sm">
                    <Heading fontSize="4xl">Simplicity</Heading>
                    <Text fontSize="lg">
                      Celest makes it easy to focus on what's important.
                    </Text>
                    <Text fontSize="md" opacity={0.7}>
                        With hot reload, you can see your changes instantly.
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
});


export function DartInfoPage() {
  const bgColor = useColorModeValue('gray.900', 'gray.800')
  const textColor = useColorModeValue('white', 'gray.100')

  const adoptionData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Dart Adoption',
        data: [20, 25, 35, 50, 70, 85],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const searchTrendsData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Dart Search Trends',
        data: [30, 40, 55, 65, 80, 95],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Dart Growth',
      },
    },
  }

  return (
    <Flex direction={['column', 'column', 'row']} br="100"  bg="rgba(255, 255, 255, 0.1)" p={8} color={textColor}>
      <Box  flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>
        <Heading as="h1" size="2xl" mb={4}>
          Dart will take over the world
        </Heading>
        <Text fontSize="lg" mb={4}>
          Dart is poised to become the dominant programming language due to its versatility,
          performance, and strong backing from Google. It offers a unique combination of features
          that make it ideal for both web and mobile development, especially when paired with the
          Flutter framework. Dart's sound type system, hot reload capability, and efficient
          garbage collection make it a joy to work with for developers of all skill levels.
        </Text>
        <Link
          href="https://dillonnys.com/posts/why-im-betting-on-dart/"
          color="teal.500"
          fontWeight="bold"
          isExternal
        >
          Learn more about why Dart is the future
        </Link>
      </Box>
      <Box flex={1}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Adoption</Tab>
            <Tab>Search Trends</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Line options={chartOptions} data={adoptionData} />
            </TabPanel>
            <TabPanel>
              <Line options={chartOptions} data={searchTrendsData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}

export function DeveloperProductivity() {
  const bgColor = useColorModeValue('gray.900', 'gray.800')
  const textColor = useColorModeValue('white', 'gray.100')

  return (
    <Flex direction={['column', 'column', 'row']} bg={bgColor} minHeight="100vh" p={8} color={textColor}>
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>
        <Heading as="h1" size="2xl" mb={4}>
          Developer Productivity
        </Heading>
        <Text fontSize="lg" mb={4}>
          Your frontend Dart developers will now become full-stack developers. 
          With Dart's versatility, developers can seamlessly transition between 
          building beautiful user interfaces with Flutter and creating robust 
          backend services. This unified language approach significantly 
          increases productivity and reduces the learning curve, allowing your 
          team to deliver end-to-end solutions more efficiently than ever before.
        </Text>
      </Box>
      <Box flex={1}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Frontend</Tab>
            <Tab>Backend</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                bg="gray.800"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                borderColor="gray.700"
                borderWidth="1px"
              >
                <CodeBlock code={codeBlock1} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                bg="gray.800"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                borderColor="gray.700"
                borderWidth="1px"
              >
                <CodeBlock code={codeBlock2} />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}
