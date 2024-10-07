import { PostHogProvider } from "posthog-js/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import localFont from "next/font/local";
import { loadIntercom } from "./Intercom";
import { useRouter } from "next/router";

import { ChakraProvider } from '@chakra-ui/react'
import CodeBlock from "@components/landing/codeblock"



const poppins = localFont({
  preload: true,
  src: "../public/fonts/Poppins.woff2",
  display: "swap",
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  const mainRef = useRef(null); // Create a ref for <main>

  const { asPath } = useRouter();
  const isContactPage = asPath === "/contact";
  if (isContactPage) {
    useEffect(() => {
      loadIntercom();
    }, []);
  }

  return (

    <ChakraProvider>
    <PostHogProvider
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      }}
    >
          {/* <PersistentLayout starsRef={mainRef}> */}

      {isContactPage && (
        <>
          <link
            rel="preconnect"
            href="https://widget.intercom.io"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://js.intercomcdn.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://downloads.intercomcdn.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://api-iam.intercom.io"
            crossOrigin=""
          />
        </>
      )}
           {/* <Stars mainRef={mainRef}/> */}
      <main ref={mainRef} className={`${poppins.variable}`}>
   
      {/* <NormalComponent/> */}
      <div>
      {/* <FineGrained/> */}
      </div>
  
          <Component {...pageProps} />
        <FeatureShowcase/>

        <CodeBlock code="const x = 42;" language="javascript" />

        {/* <CodeBlock
  code={`const hello = 'Hello, world!';`}
  language="javascript"
/> */}

        {/* <PricingCards/> */}
        <SpeedInsights />

        
      </main>
      {/* </PersistentLayout> */}

 
    </PostHogProvider>
    </ChakraProvider>
  
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
  VStack,
} from "@chakra-ui/react"

const FeatureCard = ({ icon, title, description }) => (
  <Box     bg={useColorModeValue("gray.800", "gray.900")}
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
          title="Built-in Turso Database Access"
          description="Effortlessly manage and scale your data with integrated Turso Database access."
        />
        <FeatureCard
          icon={FaStream}
          title="Automatic Serialization"
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

  Button,




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

import { observable } from "@legendapp/state";
import { useObservable, Memo, reactive } from "@legendapp/state/react";
import { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import { motion } from "framer-motion";

// Making the motion.div reactive to changes from @legendapp/state
const MotionDiv = reactive(motion.div);

function FineGrained() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const stars$ = useObservable([]);

  // Set window size when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Initialize stars after window size is available
      stars$.set(
        [...Array(50)].map(() => {
          const randomSize = Math.random() * 50 + 10; // Random size between 10px and 60px
          const randomBoxShadowBlur = Math.random() * 10 + 5; // Random blur radius between 5px and 15px
          const randomBoxShadowSpread = Math.random() * 4 + 2; // Random spread radius between 2px and 6px
          const randomBoxShadowOpacity = Math.random() * 0.5 + 0.3; // Random opacity between 0.3 and 0.8

          return {
            scale: randomSize,
            maxScale: randomSize * 2, // Max scale for yoyo effect
            minScale: randomSize / 2, // Min scale for yoyo effect
            boxShadowBlur: randomBoxShadowBlur,
            maxBoxShadowBlur: randomBoxShadowBlur * 2,
            minBoxShadowBlur: randomBoxShadowBlur / 2,
            boxShadowSpread: randomBoxShadowSpread,
            maxBoxShadowSpread: randomBoxShadowSpread * 2,
            minBoxShadowSpread: randomBoxShadowSpread / 2,
            boxShadowOpacity: randomBoxShadowOpacity,
            maxBoxShadowOpacity: 0.8,
            minBoxShadowOpacity: 0.3,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 100, // Random initial velocity between -50 and 50
            vy: (Math.random() - 0.5) * 100, // Random initial velocity between -50 and 50
            minVx: Math.random() * 20 + 20, // Minimum speed for x-axis
            minVy: Math.random() * 20 + 20, // Minimum speed for y-axis
            yoyoDirection: Math.random() > 0.5 ? 1 : -1, // Random initial yoyo direction
          };
        })
      );
    }
  }, []);

  const renderCount = useRef(0);
  renderCount.current++;

  useInterval(() => {
    stars$.forEach((star$, index) => {
      star$.set(v => {
        let { yoyoDirection } = v;

        // Yoyo effect for scale
        let newScale = v.scale + yoyoDirection * 0.5;
        if (newScale > v.maxScale) {
          newScale = v.maxScale;
          yoyoDirection = -1; // Reverse direction when hitting max
        } else if (newScale < v.minScale) {
          newScale = v.minScale;
          yoyoDirection = 1; // Reverse direction when hitting min
        }

        // Yoyo effect for boxShadowBlur
        let newBoxShadowBlur = v.boxShadowBlur + yoyoDirection * 0.2;
        if (newBoxShadowBlur > v.maxBoxShadowBlur) {
          newBoxShadowBlur = v.maxBoxShadowBlur;
        } else if (newBoxShadowBlur < v.minBoxShadowBlur) {
          newBoxShadowBlur = v.minBoxShadowBlur;
        }

        // Yoyo effect for boxShadowSpread
        let newBoxShadowSpread = v.boxShadowSpread + yoyoDirection * 0.1;
        if (newBoxShadowSpread > v.maxBoxShadowSpread) {
          newBoxShadowSpread = v.maxBoxShadowSpread;
        } else if (newBoxShadowSpread < v.minBoxShadowSpread) {
          newBoxShadowSpread = v.minBoxShadowSpread;
        }

        // Yoyo effect for boxShadowOpacity
        let newBoxShadowOpacity = v.boxShadowOpacity + yoyoDirection * 0.01;
        if (newBoxShadowOpacity > v.maxBoxShadowOpacity) {
          newBoxShadowOpacity = v.maxBoxShadowOpacity;
        } else if (newBoxShadowOpacity < v.minBoxShadowOpacity) {
          newBoxShadowOpacity = v.minBoxShadowOpacity;
        }

        return {
          ...v,
          // Update the position based on velocity
          x: v.x + v.vx * 0.016, // Adjust position based on velocity and delta time
          y: v.y + v.vy * 0.016,
          vx: Math.abs(v.vx) < v.minVx ? Math.sign(v.vx) * v.minVx : v.vx * 0.999, // Ensure minimum speed on x-axis
          vy: Math.abs(v.vy) < v.minVy ? Math.sign(v.vy) * v.minVy : v.vy * 0.999, // Ensure minimum speed on y-axis

          // Apply the yoyo effect values
          scale: newScale,
          boxShadowBlur: newBoxShadowBlur,
          boxShadowSpread: newBoxShadowSpread,
          boxShadowOpacity: newBoxShadowOpacity,

          // Update yoyo direction
          yoyoDirection: yoyoDirection,
        };
      });
    });
  }, 100); // 60fps

  // Check for boundary collision and reverse velocity
  useEffect(() => {
    const checkBoundaries = () => {
      stars$.forEach(star$ => {
        star$.set(v => {
          let { x, y, vx, vy } = v;
          const rect = { width: windowSize.width, height: windowSize.height };
          if (x < 0 || x > rect.width) vx = -vx;
          if (y < 0 || y > rect.height) vy = -vy;
          return { ...v, vx, vy };
        });
      });
    };
    const intervalId = setInterval(checkBoundaries, 16);
    return () => clearInterval(intervalId);
  }, [stars$, windowSize]);

  return (
    <div>

      {stars$.map((star$, index) => (
        <MotionDiv
          key={index}
          className="star"
          style={{
            position: 'absolute',
            background: 'linear-gradient(45deg, #ffffff, #ffffff)',
            borderRadius: '50%',
            width: `${star$.get().scale}px`,
            height: `${star$.get().scale}px`
          }}
          $animate={() => ({
            width: `${star$.get().scale}px`,
            height: `${star$.get().scale}px`,
            left: `${star$.get().x}px`,
            top: `${star$.get().y}px`,
            // transform: `translate(${star$.get().x}px, ${star$.get().y}px) scale(${star$.get().scale / 100})`,

            // Change all properties of the box shadow dynamically
            boxShadow: `0px 0px ${star$.get().boxShadowBlur}px ${star$.get().boxShadowSpread}px rgba(255, 255, 255, ${star$.get().boxShadowOpacity})`,
            transition: { duration: 1.5, ease: "linear" }
          })}
        />
      ))}
    </div>
  );
}




// const PersistentLayout = ({ children, starsRef }) => {
//   return (
//     <div>
//       {/* <Stars mainRef={starsRef} /> */}
//       {children}
//     </div>
//   );
// };





// import React, { useRef, useState } from 'react';
// import { gsap } from 'gsap';

// export function Stars({ mainRef }) {
//   const starRef = useRef(null);
//   const [pageHeight, setPageHeight] = useState(1000);
//   const [starPositions, setStarPositions] = useState([]); // To store initial positions
//   const router = useRouter();

//   const updatePageHeight = () => {
//     if (mainRef.current) {
//       const newHeight = mainRef.current.offsetHeight; // Use the height of <main>
//       setPageHeight(newHeight);
//     }
//   };

//   useEffect(() => {
//     // Set initial height and update it on window resize
//     updatePageHeight();

//     const handleRouteChange = () => {
//       setTimeout(updatePageHeight, 100); // Small delay to ensure the new content is rendered
//     };

//     router.events.on('routeChangeComplete', handleRouteChange);

//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange);
//     };
//   }, [router.events, mainRef]);

//   // Generate initial star positions once on mount
//   useEffect(() => {
//     if (starPositions.length === 0) {
//       const initialPositions = [...Array(50)].map(() => ({
//         top: Math.random() * mainRef.current.offsetHeight, // Store top in percentage of page height
//         left: Math.random() * mainRef.current.offsetWidth, // Store left in percentage of viewport width
//       }));
//       setStarPositions(initialPositions); // Store initial positions in state
//     }
//   }, [starPositions]);

//   useEffect(() => {
//     let stars = gsap.utils.toArray(".star");

//     // Store velocity for each star, including a minimum velocity for each star
//     const velocities = stars.map(() => ({
//       vx: (Math.random() - 0.5) * 50, // Initial speed on x-axis
//       vy: (Math.random() - 0.5) * 50, // Initial speed on y-axis
//       minVx: Math.random() * 1 + 10, // Random minimum x velocity
//       minVy: Math.random() * 1 + 10, // Random minimum y velocity
//     }));

//     // Animate stars with friction and boundary collision
//     stars.forEach((star, i) => {
//       const starEl = star;
//       const velocity = velocities[i];

//       gsap.fromTo(
//         star,
//         { scale: 1, opacity: 1, boxShadow: '0px 0px 10px 2px rgba(255, 255, 255, 0.5)' },
//         {
//           scale: 1.5,
//           opacity: 1,
//           boxShadow: '0px 0px 20px 4px rgba(255, 255, 255, 0.8)',
//           duration: 1.5,
//           ease: "linear",
//           repeat: -1,
//           repeatDelay: 0,
//           delay: i * 0.2,
//           yoyo: true,
//         }
//       );

//       // Animate each star
//       gsap.ticker.add(() => {
//         // Update position based on velocity
//         let rect = starEl.getBoundingClientRect();

//         // Apply friction (gradually reduce velocity)
//         velocity.vx *= 0.999;
//         velocity.vy *= 0.999;

//         // Ensure the velocity never drops below the random minimum velocity
//         if (Math.abs(velocity.vx) < velocity.minVx) {
//           velocity.vx = Math.sign(velocity.vx) * velocity.minVx;
//         }
//         if (Math.abs(velocity.vy) < velocity.minVy) {
//           velocity.vy = Math.sign(velocity.vy) * velocity.minVy;
//         }

//         // Update the star's position
//         gsap.set(starEl, {
//           x: `+=${velocity.vx * 0.016}`, // Multiply by delta time (approx 16ms per frame)
//           y: `+=${velocity.vy * 0.016}`,
//         });

//         // Check for boundary collision (screen edges)
//         if (rect.left + velocity.vx < 0 || rect.right + velocity.vx > window.innerWidth) {
//           velocity.vx *= -1; // Reverse x velocity if hitting the left or right edge
//         }
//         if (rect.top + velocity.vy < 0 || rect.bottom + velocity.vy > pageHeight) {
//           velocity.vy *= -1; // Reverse y velocity if hitting the top or bottom edge
//         }
//       });
//     });
//   }, [starPositions]); // Only run when star positions are set

//   return (
//     <div>
//       <div
//         ref={starRef}
//         style={{
//           position: 'absolute', // Ensure it's positioned relative to the content
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: `${pageHeight}px`, // Dynamically set the height based on full page height
//           zIndex: -1,
//           background: 'linear-gradient(to bottom, #1e3a8a, #000000)',
//           overflow: 'hidden',
//           filter: 'blur(2px)',
//         }}
//       >
//         {starPositions.map((position, i) => {
//           const size = Math.random() * 15 + 3;
//           return (
//             <div
//               key={i}
//               className="star"
//               style={{
//                 position: 'absolute',
//                 top: `${position.top}px`, // Use the percentage stored in starPositions
//                 left: `${position.left}px`,
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 background: 'linear-gradient(45deg, #ffffff, #ffffff)', // Gradient for star
//                 borderRadius: '50%',
//                 boxShadow: '0px 0px 10px 2px rgba(255, 255, 255, 0.5)',
//               }}
//             ></div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
