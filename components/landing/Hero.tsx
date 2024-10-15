import { HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";

import {
  Button,
  Container,
  Grid,
  Text,
  VStack
} from '@chakra-ui/react';
import CodeBlock from "@components/landing/codeblock";
import { usePostHog } from "posthog-js/react";

import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import { useEffect } from "react";


export default function Hero() {
  const posthog = usePostHog();

  const [boxHeight, setBoxHeight] = useState(440);

  // Function to check and set height based on screen resolution
  const updateBoxHeight = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    setBoxHeight(height > width ? 880 : 440);
  };

  // Update box height on window resize
  useEffect(() => {
    updateBoxHeight();
    window.addEventListener("resize", updateBoxHeight);
    return () => window.removeEventListener("resize", updateBoxHeight);
  }, []);

  return (
    <VStack zIndex={1} maxWidth="1080px" spacing={10} paddingTop={20} justifyContent="center" alignItems="center" alignContent="center" alignSelf="center" margin="0 auto">
      <Heading as="h1" size="3xl" justifyContent={"center"}  textAlign={"center"} mb={4} style={{ textShadow: '0px 0px 10px white'}}>
        Push your code to the stars
      </Heading>

      <SwitchCodeBlocks />
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

      <DartInfoPage boxHeight={boxHeight} />

      <Square1Sub />
      <Square2 boxHeight={boxHeight} />
      <Square2Sub />
      <Square3 boxHeight={boxHeight} />

      <Square3Sub />

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
    <Box w="100%">
      <Flex  mt={4} mb={4} justifyContent="space-between" alignItems="center">
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

      <Box bg="gray.800" h={500} p={6} borderRadius="lg" boxShadow="lg" borderColor="gray.700" borderWidth="1px" justifyContent={"center"} alignItems={"center"} >
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



export function Square2({ boxHeight }) {
  const bgColor = useColorModeValue('gray.900', 'gray.800')
  const textColor = useColorModeValue('white', 'gray.100')

  const [activeCode, setActiveCode] = useState("frontend");

  const handleCodeSwitch = (codeType) => {
    setActiveCode(codeType);
  };

  return (
    <Flex
      h={boxHeight}
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
        Simplicity is the core of Celest. It allows developers to focus on creating beautiful user interfaces and efficient backends without the hassle of switching between tools. Celest's integrated approach streamlines workflows, reducing complexity and enhancing productivity.
        </Text>
        
      </Box>
    </Flex>
  )
}



export function Square3({ boxHeight }) {
  const textColor = useColorModeValue('white', 'gray.100')


  const [activeCode, setActiveCode] = useState("frontend");

  const handleCodeSwitch = (codeType) => {
      setActiveCode(codeType);
  };

  return (
    <Flex h={boxHeight} direction={['column', 'column', 'row']} borderRadius="20px" // Added border-radius for smooth edges
    bg="rgba(255, 255, 255, 0.1)" p={8} color={textColor} style={{ backdropFilter: 'blur(10px)' }}>

  {/* <Spacer /> */}

  <Box  flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>
    <Heading as="h1" size="2xl" mb={4}  style={{ textShadow: '0px 0px 10px white'}}>
      Developer Productivity
    </Heading>
    <Text fontSize="lg" mb={4}>
    Celest empowers developers to boost their productivity by unifying frontend and backend development. Its seamless transition between building interfaces and backend services enables developers to create full-stack solutions efficiently, minimizing context switching and maximizing impact.
    </Text>
    {/* <Link
      href="https://dillonnys.com/posts/why-im-betting-on-dart/"
      color="teal.500"
      fontWeight="bold"
      isExternal
    >
      Learn more about why Dart is the future
    </Link> */}
  </Box>
  <Box flex={1}>
  <Box flex={1}>  
    {activeCode === "frontend" ? (
      <CodeBlock code={frontendCode} />
    ) : (
      <CodeBlock code={backendCode} />
    )}
    </Box>
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


export function DartInfoPage({ boxHeight }) {
  const bgColor = useColorModeValue('gray.900', 'gray.800')
  const textColor = useColorModeValue('white', 'gray.100')

  const adoptionData = {
    labels: ['2020',  ' ',  ' ', '2021',  ' ',   ' ',  '2022',  ' ',   ' ',  '2024'],
    datasets: [
      {
        label: 'Deployed Apps using Dart',
        data: [1, 125, 375, 550, 750, 875, 700, 1000, 1550, 2000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const maxDataValue = Math.max(...adoptionData.datasets[0].data); // Get the highest point of the data

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
      title: {
        display: true,
        text: 'Apps using Dart',
        color: 'white', // Set title text color to white
      },
      afterDraw: function(chart) {
        const ctx = chart.ctx;
        const datasetMeta = chart.getDatasetMeta(0); // Access the first dataset (the line)
  
        // Draw a thicker, semi-transparent line for the glow effect
        ctx.save(); // Save the current drawing state
  
        ctx.lineWidth = 10; // Thicker line width for the glow
        ctx.strokeStyle = 'rgba(75, 192, 192, 0.4)'; // Semi-transparent glow color
        ctx.beginPath();
        datasetMeta.data.forEach((point, i) => {
          const { x, y } = point;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
        ctx.restore(); // Restore the previous drawing state
  
        // Draw the original line on top
        ctx.save(); // Save the current drawing state
        ctx.lineWidth = datasetMeta.dataset.options.borderWidth; // Original line width
        ctx.strokeStyle = datasetMeta.dataset.options.borderColor; // Original line color
        ctx.beginPath();
        datasetMeta.data.forEach((point, i) => {
          const { x, y } = point;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
        ctx.restore(); // Restore the previous drawing state without shadow
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Change x-axis labels to white
        },
        grid: {
          display: false, // Remove x-axis grid
        },
      },
      y: {
        ticks: {
          color: 'white', // Change y-axis labels to white
        },
        grid: {
          display: false, // Remove y-axis grid
        },
        min: 0, // Ensure the y-axis starts at 0
        max: maxDataValue, // Set the max to the highest point in the dataset
      },
    },
  };
  
  
  
  

  return (
    <Flex  h={boxHeight} direction={['column', 'column', 'row']} borderRadius="20px" // Added border-radius for smooth edges
    bg="rgba(255, 255, 255, 0.1)" p={8} color={textColor} style={{ backdropFilter: 'blur(10px)' }}>
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>  
        <Heading as="h1" size="2xl" mb={4}  style={{ textShadow: '0px 0px 10px white' }}>
          Dart will take over the world
        </Heading>
        <Text fontSize="lg" mb={4}>
        Dart is revolutionizing both web and mobile development by providing a powerful, unified language with incredible flexibility. Its combination of speed, efficiency, and ease of use is rapidly making it the top choice for developers. Dart is set to dominate the future of development by streamlining both client and server codebases.

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
        <Line width="50%" height="50%"  options={chartOptions} data={adoptionData} />
      </Box>
    </Flex>
  )
}


