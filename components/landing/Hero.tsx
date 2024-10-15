import Link from "next/link";
import { HStack, Spacer } from "@chakra-ui/react";

import {
  Button,
  Text,
  VStack,
  Container,
  Grid
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
    <VStack zIndex={1} maxWidth="1080px" spacing={10} paddingTop={20} justifyContent="center" alignItems="center" alignContent="center" alignSelf="center" margin="0 auto">
{/* 
        <h1  style={{ textShadow: '0px 0px 10px white', fontSize: '2xl', fontWeight: 'bold', textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
          Push your code to the stars
        </h1> */}

<Heading as="h1" size="3xl" mb={4} style={{ textShadow: '0px 0px 10px white'}}>
Push your code to the stars

        </Heading>

      <SwitchCodeBlocks/>
      <Button
        className="px-6"
        onClick={() => {
          posthog.capture("cta_clicked", { location: "hero" });
          window.location.href = "http://localhost:3000/docs/download";
        }}
      >
        Get Started
      </Button>
      <Spacer></Spacer>
      {/* Square 1 */}
      <DartInfoPage/>
      <Square1Sub/>
      {/* <FeatureShowcase/> */}
      <Square2/>  
      <Square2Sub/>

      {/* <Testimonials></Testimonials> */}
      <Square3/>  
      <Square3Sub/>

    </VStack>
  );
}

export const Square1Sub = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={6}>
        <TestimonialCard
          title="Dart Cloud Functions"
          one="Write your backend like you write your Flutter App"
          two="No more context Switching"
          three="Reuse the same code across your whole stack"
        />

        <TestimonialCard
          title="Flutter on the Server"
          one="Deploy your Flutter apps directly on the server for full-stack development"
          two="Unify client and server logic with a single codebase"
          three="Experience high performance and seamless integration across platforms"
        />

        <TestimonialCard
          title="Server-Side Widgets"
          one="Build dynamic, reusable widgets for server-side rendering"
          two="Leverage Flutter's widget system to enhance backend functionality"
          three="Simplify server-side logic with modular components"
        />
      </Grid>
    </Container>
  );
};

export const Square2Sub = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={6}>
        <TestimonialCard
          title="Hot Reload"
          one="Instantly update your backend code without restarts"
          two="Seamlessly iterate on backend logic in real-time"
          three="Boost productivity with continuous code reloading"
        />

        <TestimonialCard
          title="Auto-Serialization"
          one="Automatically convert data structures for smooth communication"
          two="Eliminate manual data handling with built-in serialization"
          three="Ensure data integrity across client and server with minimal effort"
        />

        <TestimonialCard
          title="Client Generation"
          one="Automatically generate clients for seamless API integration"
          two="Reduce client-side development time with auto-generated code"
          three="Simplify communication between server and client"
        />
      </Grid>
    </Container>
  );
};

export const Square3Sub = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={['1fr', '1fr', 'repeat(4, 1fr)']} gap={6}>
        <TestimonialCard
          title="HIPAA/SOC2 Compliant"
          one="Ensure compliance with industry standards for data protection"
          two="Safeguard sensitive data with built-in security features"
          three="Simplify compliance with ready-to-use security solutions"
        />

        <TestimonialCard
          title="Faster Time-To-Market"
          one="Accelerate development cycles with efficient workflows"
          two="Reduce time spent on backend logic with reusable components"
          three="Launch your product faster with pre-built solutions"
        />

        <TestimonialCard
          title="Performance"
          one="Maximize backend performance for scalable applications"
          two="Optimize resource usage and server response times"
          three="Deliver seamless user experiences with high-performance code"
        />

        <TestimonialCard
          title="Fully Leverage Your Talent"
          one="Enable your team to focus on innovation, not infrastructure"
          two="Reduce repetitive tasks with automated workflows"
          three="Maximize efficiency by utilizing your team's full potential"
        />
      </Grid>
    </Container>
  );
};



const TestimonialCard = ({ title, one, two, three }) => {
  return (
      <Box
          // w="300px"
          // h="300px"
          bg="rgba(255, 255, 255, 0.1)"
          // borderRadius="md"
          borderRadius="20px"
          p={6}
          color="white"
          textAlign="center"
          boxShadow="lg"
          _hover={{ bg: "rgba(255, 255, 255, 0.15)" }}
          transition="background-color 0.3s"
      >
          <VStack spacing={4}>
              <Text fontSize="large" fontWeight="bold" style={{ textShadow: '0px 0px 10px white'}}>{title}</Text>
              <Text fontSize="small" >{one}</Text>
              <Text fontSize="small" >{two}</Text>
              <Text fontSize="small" >{three}</Text>          
            </VStack>
      </Box>
  );
};

import { Database, Fingerprint, Layers } from 'lucide-react'; // Lucide icons

export function SwitchCodeBlocks() {
  const [selectedBlock, setSelectedBlock] = useState(1); // Default to block 1

  const codeBlock1 = `import 'package:celest/celest.dart';
import 'package:celest_backend/src/database/task_database.dart';

const project = Project(
  name: 'tasks',
);

const tasksDatabase = Database(
  schema: Schema.drift(TaskDatabase),
);
`;

  const codeBlock2 = `import 'package:celest/celest.dart';

const project = Project(
  name: 'celest_auth_example',
);

const auth = Auth(
  providers: [
    AuthProvider.email(),
    AuthProvider.sms(),
  ],
);
`;

  const codeBlock3 = `import 'package:celest/celest.dart';
import 'package:celest_backend/exceptions/bad_name_exception.dart';
import 'package:celest_backend/models/person.dart';

/// Says hello to a [person].
@cloud
Future<String> sayHello({required Person person}) async {
  if (person.name.isEmpty) {
    throw BadNameException('Name cannot be empty');
  }

  print('Saying hello to  ');

  return 'Hello,  !';
}`;

  const renderCodeBlock = () => {
    switch (selectedBlock) {
      case 1:
        return codeBlock1;
      case 2:
        return codeBlock2;
      case 3:
        return codeBlock3;
      default:
        return codeBlock1;
    }
  };

  return (
    <Box w="100%" f={1}>
      <Flex mt={4} mb={4} justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => setSelectedBlock(1)}
          flex={1}
          borderRadius="md"
          p={6}
          bg={selectedBlock === 1 ? 'gray.700' : 'gray.800'}
          color="white"
          mr={2}
        >
          <Box as="span" mr={2}>
            <Layers size={24} /> {/* Lucide icon for Functions */}
          </Box>
          Functions
        </Button>
        <Button
          onClick={() => setSelectedBlock(2)}
          flex={1}
          borderRadius="md"
          p={6}
          bg={selectedBlock === 2 ? 'gray.700' : 'gray.800'}
          color="white"
          mr={2}
        >
          <Box as="span" mr={2}>
            <Fingerprint size={24} /> {/* Lucide icon for Auth */}
          </Box>
          Auth
        </Button>
        <Button
          onClick={() => setSelectedBlock(3)}
          flex={1}
          borderRadius="md"
          p={6}
          bg={selectedBlock === 3 ? 'gray.700' : 'gray.800'}
          color="white"
        >
          <Box as="span" mr={2}>
            <Database size={24} /> {/* Lucide icon for Data */}
          </Box>
          Data
        </Button>
      </Flex>

      <Box bg="gray.800" p={6} borderRadius="lg" boxShadow="lg" borderColor="gray.700" borderWidth="1px">
        <CodeBlock code={renderCodeBlock()} />
      </Box>
    </Box>
  );
}




import { useState } from "react";

const frontendCode = `
// frontendCode.dart

 
 
 
 
 
 
 
`;

const backendCode = `
// Backend.dart

 
 
 
 
 
 
 
`;



export function Square2() {
  const bgColor = useColorModeValue('gray.900', 'gray.800')
  const textColor = useColorModeValue('white', 'gray.100')

  const [activeCode, setActiveCode] = useState("frontend");

  const handleCodeSwitch = (codeType) => {
    setActiveCode(codeType);
  };

  return (
    <Flex
      direction={['column-reverse', 'column-reverse', 'row']}
      borderRadius="20px"
      bg="rgba(255, 255, 255, 0.1)"
      p={10}
      color={textColor}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <Box flex={1} p={9}>
        <video
          width="100%"
          autoplay
          loop
          muted
          src="/hot-reload.mov"
          type="video/mp4"
        />
      </Box>
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>
        <Heading as="h1" size="2xl" mb={4} style={{ textShadow: '0px 0px 10px white'}}>
          Simplicity
        </Heading>
        <Text fontSize="lg" mb={4}>
          With Celest, developers can seamlessly transition between
          building beautiful user interfaces with Flutter and creating robust
          backend services. This unified approach significantly
          increases productivity and reduces the learning curve, allowing your
          team to deliver end-to-end solutions more efficiently than ever before.
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
    </Flex>
  )
}



export function Square3() {
  const bgColor = useColorModeValue('gray.900', 'gray.800')
  const textColor = useColorModeValue('white', 'gray.100')

  const adoptionData = {
    labels: ['2020', '2021', '2022', '2024'],
    datasets: [
      {
        label: 'Deployed Apps using Dart',
        data: [1, 125, 375, 550, 750, 875],
        borderColor: 'rgb(75, 192, 192)',
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

  const [activeCode, setActiveCode] = useState("frontend");

  const handleCodeSwitch = (codeType) => {
      setActiveCode(codeType);
  };

  return (
    <Flex direction={['column', 'column', 'row']} borderRadius="20px" // Added border-radius for smooth edges
    bg="rgba(255, 255, 255, 0.1)" p={8} color={textColor} style={{ backdropFilter: 'blur(10px)' }}>

  {/* <Spacer /> */}

  <Box  flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>
    <Heading as="h1" size="2xl" mb={4}  style={{ textShadow: '0px 0px 10px white'}}>
      Developer Productivity
    </Heading>
    <Text fontSize="lg" mb={4}>
      With Celest, developers can seamlessly transition between
      building beautiful user interfaces with Flutter and creating robust
      backend services. This unified approach significantly
      increases productivity and reduces the learning curve, allowing your
      team to deliver end-to-end solutions more efficiently than ever before.
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
    {activeCode === "frontend" ? (
      <CodeBlock code={frontendCode} />
    ) : (
      <CodeBlock code={backendCode} />
    )}
    <HStack w="100%" justifyContent="center">
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
  </Box>

</Flex>
  )
}



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
// export const Square3 = observer(function Square3() {
//     // Manage the active code block state (frontend/backend)
//     const [activeCode, setActiveCode] = useState("HotreloadCode1");

//     // glow is automatically tracked for changes
//     const hasGlow = glowState$.hasGlow.get();

//     // Function to simulate hot-reload by toggling the glow effect
//     const toggleGlow = () => {
//         glowState$.hasGlow.set((prev) => !prev);
//     };

//     // Auto change the glow effect every few seconds to simulate hot-reload
//     useEffect(() => {
//         const interval = setInterval(toggleGlow, 2000); // Toggle every 2 seconds
//         return () => clearInterval(interval); // Cleanup interval on unmount
//     }, []);

//     // Conditional boxShadow for glow effect
//     const boxShadowStyle = hasGlow
//         ? "0px 0px 20px white" // Glow effect
//         : "none"; // No glow

//     // Function to handle switching code blocks
//     const handleCodeSwitch = (codeType) => {
//         setActiveCode(codeType);
//     };

//     return (
//         <Box
//             // bg="gray.900"
//              bg="rgba(255, 255, 255, 0.1)"
//             w={1000}
//             borderRadius="20px"
//             color="white"
//             py={10}
//             px={8}
//             // Apply the boxShadow dynamically based on the glow state
//             boxShadow={boxShadowStyle}
//             transition="box-shadow 0.3s ease-in-out"
//         >
//             <HStack maxW="container.xl" mx="auto" spacing={10} align="center">
//                 {/* Left side: Code Block */}
//                 <Box
//                     bg="gray.800"
//                     p={6}
//                     borderRadius="lg"
//                     boxShadow="lg"
//                     borderColor="gray.700"
//                     borderWidth="1px"
//                 >
      

//                     <Box p={4} bg="gray.700" color="white" borderRadius="md">
//                         <Text fontSize="md" fontFamily="monospace">
//                             {/* Conditionally render the selected code block */}
              
//                             {glowState$.hasGlow.get() === true ? <CodeBlock code={HotreloadCode1} /> : <CodeBlock code={HotreloadCode2} />}


//                             {/* {activeCode === "HotreloadCode1" ? frontendCode : backendCode} */}
//                         </Text>
//                     </Box>
//                 </Box>

//                 <Spacer />

//                 {/* Right side: Text content */}
//                 <VStack align="start" spacing={6} maxW="sm">
//                     <Heading fontSize="4xl">Simplicity</Heading>
//                     <Text fontSize="lg">
//                       Celest makes it easy to focus on what's important.
//                     </Text>
//                     <Text fontSize="md" opacity={0.7}>
//                         With hot reload, you can see your changes instantly.
//                     </Text>
//                 </VStack>
//             </HStack>
//         </Box>
//     );
// });


export function DartInfoPage() {
  const bgColor = useColorModeValue('gray.900', 'gray.800')
  const textColor = useColorModeValue('white', 'gray.100')

  const adoptionData = {
    labels: ['2020', '2021', '2022', '2024'],
    datasets: [
      {
        label: 'Deployed Apps using Dart',
        data: [1, 125, 375, 550, 750, 875],
        borderColor: 'rgb(75, 192, 192)',
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
    <Flex direction={['column', 'column', 'row']} borderRadius="20px" // Added border-radius for smooth edges
    bg="rgba(255, 255, 255, 0.1)" p={8} color={textColor} style={{ backdropFilter: 'blur(10px)' }}>
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>  
        <Heading as="h1" size="2xl" mb={4}  style={{ textShadow: '0px 0px 10px white' }}>
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
        {/* <Tabs isFitted variant="enclosed"> */}
          {/* <TabList mb="1em">
            <Tab>Adoption</Tab>
            <Tab>Search Trends</Tab>
          </TabList> */}
          {/* <TabPanels> */}
            {/* <TabPanel> */}
              <Line width="50%" height="50%" options={chartOptions} data={adoptionData} />
            {/* </TabPanel> */}
     

          {/* </TabPanels> */}
        {/* </Tabs> */}
      </Box>
    </Flex>
  )
}


