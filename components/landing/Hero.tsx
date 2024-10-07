import Link from "next/link";
import YCLogo from "./YCLogo";
// import { Button } from "../ui/button";
import { usePostHog } from "posthog-js/react";
import {HStack, VStack, Button } from '@chakra-ui/react'
import CodeBlock from "@components/landing/codeblock"

export default function Hero() {
  const posthog = usePostHog();
  return (
    <VStack spacing={10}>

    <section
      id="hero"
      className="text-center flex flex-col items-center justify-center"
    >
      {/* <YCLogo className="mt-4" /> */}
      <h1 className="text-4xl tracking-tighter font-extrabold md:text-5xl mt-8 mb-8"  style={{ textShadow: '0px 0px 10px white' }}>
        Push your code to the stars
      </h1>
      <p className="text-lg md:text-xl mb-8">
        
      </p>
      <Link href="/docs/get-started">

      </Link>

      <HStack >
        <CodeBlock code="const x = 42;" language="javascript" />
      </HStack>
      </section>

      <Button 
      
          className="px-6"
          onClick={() => posthog.capture("cta_clicked", { location: "hero" })}
        >
          Get Started
        </Button>
 
 <FeatureShowcase/>
    </VStack>
  );
}




import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  
} from "@chakra-ui/react"

const FeatureCard = ({ icon, title, description }) => (
  <Box         bg={useColorModeValue("rgba(31, 41, 55, 0.4)", "rgba(17, 17, 17, 0.1)")} // Semi-transparent background
  backdropFilter="blur(5px)" // Apply the blur effect
  p={6} borderRadius="lg" height="100%">
    <VStack align="start" spacing={4}>
      <Icon as={icon} boxSize={12} color="green.300" />
      <Heading size="lg">{title}</Heading>
      <Text>{description}</Text>
    </VStack>
  </Box>
)

const SmallFeature = ({ icon, title, description }) => (
  <Flex align="center">
    <Icon as={icon} boxSize={8}  color="green.300" mr={4} />
    <VStack align="start" spacing={1}>
      <Heading size="sm">{title}</Heading>
      <Text fontSize="sm">{description}</Text>
    </VStack>
  </Flex>
)

import { FaDatabase, FaBolt, FaStream, Fasync, FaTasks, FaUpload, FaLock, FaHeartbeat, FaRocket, FaFire, FaCog, FaClipboardCheck } from "react-icons/fa";
export function FeatureShowcase() {
  return (
    <Container maxW="container.xl" py={16}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={16}>
        <FeatureCard
          icon={FaFire}
          title="Simplicity"
          description="It all just works, allowing you to focus on building your product without worrying about infrastructure."
        />
        <FeatureCard
          icon={FaDatabase}
          title="Turso"
          description="Effortlessly manage and scale your data with integrated Turso Database access."
        />
        <FeatureCard
          icon={FaStream}
          title="Serialization"
          description="No more toJson/fromJson—automatic serialization lets you focus on business logic."
        />
      </Grid>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
        <SmallFeature
          icon={FaBolt}
          title="Hot Reloading"
          description="Make code changes and see them live in milliseconds while maintaining the current state."
        />
        <SmallFeature
          icon={FaCog}
          title="Logs and Metrics"
          description="Gain insights into your application’s performance with integrated logging and metrics."
        />
        <SmallFeature
          icon={FaLock}
          title="HIPAA Compliant"
          description="Ensure your application meets HIPAA security standards with built-in compliance."
        />
        <SmallFeature
          icon={FaRocket}
          title="Easy to Get Started"
          description="Start quickly with a streamlined setup process that takes you from zero to deployment."
        />
      </Grid>
    </Container>
  );
}



import {

  




  Stack,

  useColorModeValue,

} from "@chakra-ui/react"
import { FaBuilding, FaLeaf, FaRobot } from "react-icons/fa"

const PriceCard = ({ title, price, icon, features, buttonText, isPopular }) => (
  <Box
    maxW="sm"
    borderWidth={isPopular ? "2px" : "1px"}
    borderRadius="lg"
    overflow="hidden"
    bg={useColorModeValue("gray.800", "gray.900")}
    borderColor={isPopular ? "blue.400" : "gray.700"}
    position="relative"
  >
    {isPopular && (
      <Box
        position="absolute"
        top={2}
        right={2}
        px={2}
        py={1}
        bg="blue.400"
        fontSize="xs"
        fontWeight="bold"
        color="white"
        borderRadius="md"
      >
        Most Popular
      </Box>
    )}
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color="white">
          {title}
        </Heading>
        <Icon as={icon} w={8} h={8} color="teal.300" />
      </Flex>
      <Text fontSize="4xl" fontWeight="bold" color="white" mb={4}>
        {price}
        <Text as="span" fontSize="sm" fontWeight="normal" color="gray.400">
          {" "}
          / month
        </Text>
      </Text>
      <Button colorScheme="teal" width="full" mb={6}>
        {buttonText}
      </Button>
      <VStack align="start" spacing={3}>
        {features.map((feature, index) => (
          <Flex key={index} align="center">
            <Box color={feature.available ? "teal.300" : "red.400"} mr={2}>
              {feature.available ? "✓" : "✗"}
            </Box>
            <Text color="gray.300" fontSize="sm">
              {feature.text}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  </Box>
)

export function PricingCards() {
  return (
    <Box bg="black" minH="100vh" py={16}>
      <Container maxW="container.xl">
        <VStack spacing={8} mb={16}>
          <Icon as={FaRobot} w={16} h={16} color="blue.400" />
          <Heading color="white" textAlign="center">
            Transparent pricing, built for growth
          </Heading>
          <Text color="gray.400" textAlign="center" maxW="2xl">
            Begin your journey at no cost, work seamlessly with your team, and scale effortlessly to support millions of
            users.
          </Text>
        </VStack>
        <Flex justify="center" align="stretch" wrap="wrap" gap={8}>
          <PriceCard
            title="Community"
            price="$0"
            icon={FaLeaf}
            buttonText="Start for Free"
            features={[
              { text: "3 Free Projects", available: true },
              { text: "1 x CPU / 1GB Memory", available: true },
              { text: "10GB file storage", available: true },
              { text: "Cold Starts", available: false },
            ]}
          />
          <PriceCard
            title="Pro"
            price="$410"
            icon={FaRobot}
            buttonText="Upgrade Now"
            isPopular={true}
            features={[
              { text: "3 Premium Projects", available: true },
              { text: "Always On Instances", available: true },
              { text: "Unlimited Free Projects", available: true },
              { text: "Octa (8 CPU/32GB RAM)", available: true },
            ]}
          />
          <PriceCard
            title="Enterprise"
            price="Custom"
            icon={FaBuilding}
            buttonText="Contact Us"
            features={[
              { text: "Multi Region / Cloud", available: true },
              { text: "HIPAA Compliance", available: true },
              { text: "Uptime SLAs", available: true },
              { text: "Private Slack channel", available: true },
              { text: "24x7x365 support", available: true },
              { text: "Designated Support Rep", available: true },
            ]}
          />
        </Flex>
      </Container>
    </Box>
  )
}

