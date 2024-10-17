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
import localFont from "next/font/local";

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

export const berkeleyMonoRegular = localFont({
  preload: true,
  src: "../../public/fonts/BerkeleyMono-Regular.ttf",
  display: "swap",
  variable: "--font-berkeley-regular",
});

export const berkeleyMonoVariable = localFont({
  preload: true,
  src: "../../public/fonts/BerkeleyMonoVariable-Regular.ttf",
  display: "swap",
  variable: "--font-berkeley-variable",
});


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
 
        <Heading as="h1" fontSize={"100px"} w={"90%"} justifyContent={"center"} textAlign={"center"} mb={4}>
          Flutter. Backend.{"\ "}
          <Text as="span" >
            Done. ✅
          </Text>
        </Heading>



      <Text as="h1" fontSize={"30px"}  fontFamily={berkeleyMonoRegular.style.fontFamily} w={"120%"} letterSpacing={"-0.05em"} justifyContent={"center"} textAlign={"center"} mb={4}  >
      Write your backend like your Flutter app &mdash; deploy it like magic 🚀
      </Text>
      <HStack spacing={10} w="70%">

      <Button
      flex={1}
        className="px-6"
        onClick={() => {
          posthog.capture("cta_clicked", { location: "hero" });
          window.location.href = "http://localhost:3000/docs/download";
        }}
        fontFamily={berkeleyMonoRegular.style.fontFamily}
        bg={""}
        fontSize={"35px"}

        borderWidth={"2px"} // Set borderWidth instead of 'border'
        borderColor={"#ffffff"} // Border color
        color={"#ffffff"} // Text color
        p={12}
        borderRadius={"40px"} // Rounded corners
      >
        Learn More
      </Button>

      <Button
      flex={1}
        className="px-6"
        onClick={() => {
          posthog.capture("cta_clicked", { location: "hero" });
          window.location.href = "http://localhost:3000/docs/download";
        }}
        fontFamily={berkeleyMonoRegular.style.fontFamily}
        fontSize={"35px"}
        bg={""}
        borderWidth={"2px"} // Set borderWidth instead of 'border'
        borderColor={"#027DFD"} // Border color
        color={"#027DFD"} // Text color
        p={12}
        borderRadius={"40px"} // Rounded corners
      >
        Docs
      </Button>

      </HStack>


  <Spacer></Spacer>
  
  <Spacer></Spacer>
  <Spacer></Spacer>
  <Spacer></Spacer>  <Spacer></Spacer>  <Spacer></Spacer>  <Spacer></Spacer>  <Spacer></Spacer>  <Spacer></Spacer>  <Spacer></Spacer>

        
      <SwitchCodeBlocks />

    

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
          one="build and power your frontend with server-rendered Flutter widgets."
          two=" "
          three=" "
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
          style={{ backdropFilter: 'blur(10px)' }}
          borderRadius="20px"
          p={6}
          color="white"
          textAlign="center"
          boxShadow="lg"
          _hover={{ bg: "rgba(255, 255, 255, 0.15)" }}
          transition="background-color 0.3s"
      >
          <VStack spacing={4}>
              <Text fontSize="large" fontWeight="bold" >{title}</Text>
              <Text fontSize="small" >{one}</Text>
              <Text fontSize="small" >{two}</Text>
              <Text fontSize="small" >{three}</Text>          
            </VStack>
      </Box>
  );
};

import { Database, Fingerprint, Layers } from 'lucide-react'; // Lucide icons
import { motion, px } from 'framer-motion';

export function SwitchCodeBlocks() {
  const [selectedBlock, setSelectedBlock] = useState(1); // Default to block 1

  const codeBlock1 = `// Functions Example
const project = Project(
  name: 'tasks',
);

const tasksDatabase = Database(
  schema: Schema.drift(TaskDatabase),
);
`;

  const codeBlock2 = `// Auth Example
import 'package:celest/celest.dart';

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

const codeBlock3 = `// Data Example
@cloud
Future<String> sayHello({required Person person}) async {
  if (person.name.isEmpty) {
    throw BadNameException('Name cannot be empty');
  }

  // Logging is handled automatically when you print to the console.
  print('Saying hello to \${person.name}');

  return 'Hello, \${person.name}!';
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
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="20px"
        justifyContent={"center"}
        alignItems={"center"}
        style={{ backdropFilter: 'blur(10px)' }}
        h={550}
      >
        <CodeBlock code={renderCodeBlock()} />
      </Box>
      <Flex mt={4} mb={4} justifyContent="space-between" margin={8} alignItems="center">
        <Button
          onClick={() => setSelectedBlock(1)}
          flex={1}
          borderRadius="md"
          p={8}
          fontSize={"25px"}
          bg={selectedBlock === 1 ? 'gray.700' : 'gray.800'}
          color="white"
          mx={4}
          fontFamily={berkeleyMonoRegular.style.fontFamily}
          _hover={{
            bg: selectedBlock === 1 ? 'gray.600' : 'gray.700', // Darken slightly on hover
            boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' // Less bright glow
          }}
        >
          <Box as="span" mr={2}>
            <Layers size={24} /> {/* Lucide icon for Functions */}
          </Box>
          Functions
        </Button>
        <Button
          onClick={() => setSelectedBlock(2)}
          flex={1}
          fontSize={"25px"}
          borderRadius="md"
          p={8}
          bg={selectedBlock === 2 ? 'gray.700' : 'gray.800'}
          color="white"
          mx={4}
          fontFamily={berkeleyMonoRegular.style.fontFamily}
          _hover={{
            bg: selectedBlock === 2 ? 'gray.600' : 'gray.700',
            boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' // Less bright glow
          }}
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
          p={8}
          fontSize={"25px"}
          bg={selectedBlock === 3 ? 'gray.700' : 'gray.800'}
          color="white"
          mx={4}
          fontFamily={berkeleyMonoRegular.style.fontFamily}
          _hover={{
            bg: selectedBlock === 3 ? 'gray.600' : 'gray.700',
            boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' // Less bright glow
          }}
        >
          <Box as="span" mr={2}>
            <Database size={24} /> {/* Lucide icon for Data */}
          </Box>
          Data
        </Button>
      </Flex>
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
        <Heading as="h1" size="2xl" mb={4} >
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
    <Heading as="h1" size="2xl" mb={4}  >
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
        font: {
          family: berkeleyMonoRegular.style.fontFamily, // Apply the custom font to the title
          size: 18, // Adjust the font size if needed
        },
      },
      tooltip: {
        titleFont: {
          family: berkeleyMonoRegular.style.fontFamily, // Apply the custom font to tooltips
        },
        bodyFont: {
          family: berkeleyMonoRegular.style.fontFamily, // Apply the custom font to the tooltip body
        },
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
          font: {
            family: berkeleyMonoRegular.style.fontFamily, // Apply the custom font to x-axis labels
            size: 14, // Adjust size as needed
          },
        },
        grid: {
          display: false, // Remove x-axis grid
        },
      },
      y: {
        ticks: {
          color: 'white', // Change y-axis labels to white
          font: {
            family: berkeleyMonoRegular.style.fontFamily, // Apply the custom font to y-axis labels
            size: 14, // Adjust size as needed
          },
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
    <Flex padding={6} h={boxHeight} direction={['column', 'column', 'row']} borderRadius="20px" // Added border-radius for smooth edges
    bg="rgba(255, 255, 255, 0.1)" p={8} color={textColor} style={{ backdropFilter: 'blur(10px)' }}>
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>  
        <Heading as="h1" color={"#92ebfe"} fontSize={"50px"}  mb={4}  >
          Flutter is changing the game.
        </Heading>
        <Text fontSize={"25px"} mb={4}   fontFamily={berkeleyMonoRegular.style.fontFamily}>
        Dart is revolutionizing both web and mobile development by providing a powerful, unified language with incredible flexibility. 

        </Text>
        <Link
          href="https://dillonnys.com/posts/why-im-betting-on-dart/"
          
        >
          <Button marginLeft={"auto"}  justifyContent={"right"}   bg={""}    color="#40C4FF"
          >Learn more</Button>
        </Link>
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Line width={"100%"} height={"100%"} options={chartOptions} data={adoptionData} />
      </Box>

    </Flex>
  )
}


