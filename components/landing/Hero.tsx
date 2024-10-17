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
 
        <Heading as="h1" fontSize={"9vh"} w={"90%"} justifyContent={"center"} textAlign={"center"} mb={4}>
          Flutter. Backend.{"\ "}
          <Text as="span" >
            Done. ✅
          </Text>
        </Heading>



      <Text as="h1"  fontSize={"2vh"}  fontFamily={berkeleyMonoRegular.style.fontFamily} w={"100%"} letterSpacing={"-0.05em"} justifyContent={"center"} textAlign={"center"}   >
      Write your backend like a Flutter app &mdash; deploy it like magic 🚀
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
        fontSize={"2vh"}
        

        borderWidth={"2px"} // Set borderWidth instead of 'border'
        borderColor={"#ffffff"} // Border color
        color={"#ffffff"} // Text color
        p={"3vh"}
        borderRadius={"40px"} // Rounded corners
      >
        Get Started
      </Button>

      <Button
      flex={1}
        className="px-6"
        onClick={() => {
          posthog.capture("cta_clicked", { location: "hero" });
          window.location.href = "http://localhost:3000/docs/download";
        }}
        fontFamily={berkeleyMonoRegular.style.fontFamily}
        // fontSize={"35px"}
        fontSize={"2vh"}
        bg={""}
        borderWidth={"2px"} // Set borderWidth instead of 'border'
        borderColor={"#027DFD"} // Border color
        color={"#027DFD"} // Text color
        // p={12}
        p={"3vh"}
        borderRadius={"40px"} // Rounded corners
      >
        Docs
      </Button>

      </HStack>


  <Spacer></Spacer>

        
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
import { Server, Code, Shield, Rocket, Gauge, Users } from 'lucide-react'; // Import icons

export const Square1Sub = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={6}>
        <TestimonialCard
          title="Dart Cloud Functions"
          one="Write your backend like you write your Flutter App"
          icon={Code}  // Pass the icon
        />
        <TestimonialCard
          title="Flutter on the Server"
          one="Deploy your Flutter apps directly on the server for full-stack development"
          icon={Server}
        />
        <TestimonialCard
          title="Server-Side Widgets"
          one="Build and power your frontend with server-rendered Flutter widgets."
          icon={Gauge}
        />
      </Grid>
    </Container>
  );
};

// Similarly, add icons to the other sections like Square2Sub, Square3Sub

export const Square2Sub = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={6}>
        <TestimonialCard
          title="Hot Reload"
          one="Instantly update your backend code without restarts"
          icon={Rocket}
        />
        <TestimonialCard
          title="Auto-Serialization"
          one="Automatically convert data structures for smooth communication"
          icon={Code}
        />
        <TestimonialCard
          title="Client Generation"
          one="Automatically generate clients for seamless API integration"
          icon={Users}
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
          icon={Shield} // Add icon here
        />

        <TestimonialCard
          title="Faster Time-To-Market"
          one="Accelerate development cycles with efficient workflows"
          two="Reduce time spent on backend logic with reusable components"
          three="Launch your product faster with pre-built solutions"
          icon={Rocket} // Add icon here
        />

        <TestimonialCard
          title="Performance"
          one="Maximize backend performance for scalable applications"
          two="Optimize resource usage and server response times"
          three="Deliver seamless user experiences with high-performance code"
          icon={Gauge} // Add icon here
        />

        <TestimonialCard
          title="Fully Leverage Your Talent"
          one="Enable your team to focus on innovation, not infrastructure"
          two="Reduce repetitive tasks with automated workflows"
          three="Maximize efficiency by utilizing your team's full potential"
          icon={Users} // Add icon here
        />
      </Grid>
    </Container>
  );
};




import { Icon1, Icon2, Icon3 } from 'lucide-react'; // Replace with actual icons

const TestimonialCard = ({ title, one, icon }) => {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.1)"
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
        {icon && <Box as={icon} boxSize={8} />} {/* Add the icon here */}
        <Text fontSize="large" fontWeight="bold">{title}</Text>
        {/* <Text fontSize="small">{one}</Text> */}
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
        // bg="rgba(255, 255, 255, 0.1)"
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

const frontendCode = `// Frontend.dart


 
 
`;

const backendCode = `// Backend.dart


 
 
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
      p={8} 
      color={textColor}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <Box flex={1} p={9}>
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Evs1f0zHpzk" title="Dart Cloud Functions with Celest" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Box>
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>



    <Heading as="h1" color={"#92ebfe"} fontSize={"50px"}  mb={4}  >
    Simplicity
        </Heading>
        <Text fontSize={"25px"} mb={4}   fontFamily={berkeleyMonoRegular.style.fontFamily}>
        Simplicity is the core of Celest. It allows developers to focus on creating beautiful user interfaces and efficient backends without the hassle of switching between tools.
        </Text>
        
      </Box>
    </Flex>
  )
}



export function Square3({ boxHeight }) {
  const textColor = useColorModeValue('white', 'gray.100');

  const [activeCode, setActiveCode] = useState("frontend");

  const handleCodeSwitch = (codeType) => {
    setActiveCode(codeType);
  };

  return (
    <Flex
      h={boxHeight}
      direction={['column', 'column', 'row']}
      borderRadius="20px" // Added border-radius for smooth edges
      bg="rgba(255, 255, 255, 0.1)"
      p={8} 
      color={textColor}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>
        <Heading as="h1" color={"#92ebfe"} fontSize={"50px"} mb={4}>
          Developer Productivity
        </Heading>
        <Text
          fontSize={"25px"}
          mb={4}
          fontFamily={berkeleyMonoRegular.style.fontFamily}
        >
          Celest empowers developers to boost their productivity by unifying frontend and backend development.
        </Text>
      </Box>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box flexShrink={0} overflow={"hidden"} width="100%">
          {activeCode === "frontend" ? (
            <CodeBlock code={frontendCode} />
          ) : (
            <CodeBlock code={backendCode} />
          )}
        </Box>
        <HStack
  p={4}
  flexGrow={1}
  justifyContent="center"
  alignItems="center"
  alignSelf="center"
>
  <Button
    onClick={() => handleCodeSwitch("frontend")}
    flex={1}
    borderRadius="md"
    p={8}
    fontSize={"25px"}
    bg={activeCode === "frontend" ? 'gray.700' : 'gray.800'}
    color="white"
    mx={4}
    fontFamily={berkeleyMonoRegular.style.fontFamily}
    _hover={{
      bg: activeCode === "frontend" ? 'gray.600' : 'gray.700',
      boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' // Less bright glow
    }}
  >
    Frontend
  </Button>
  <Button
    onClick={() => handleCodeSwitch("backend")}
    flex={1}
    borderRadius="md"
    p={8}
    fontSize={"25px"}
    bg={activeCode === "backend" ? 'gray.700' : 'gray.800'}
    color="white"
    mx={4}
    fontFamily={berkeleyMonoRegular.style.fontFamily}
    _hover={{
      bg: activeCode === "backend" ? 'gray.600' : 'gray.700',
      boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' // Less bright glow
    }}
  >
    Backend
  </Button>
</HStack>

      </Box>
    </Flex>
  );
}


export function DartInfoPage({ boxHeight }) {
  const bgColor = useColorModeValue('gray.900', 'gray.800');
  const textColor = useColorModeValue('white', 'gray.100');

  // Update the adoption data for Flutter and React Native
  const adoptionData = {
    labels: [
      '2004-01', '2004-02', '2004-03', '2004-04', '2004-05', '2004-06', '2004-07', '2004-08', '2004-09', '2004-10',
      '2023-09', '2023-10', '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08',
    ],
    datasets: [
      {
        label: 'Flutter (United States)',
        data: [18, 18, 15, 20, 17, 21, 17, 17, 22, 21, 86, 81, 90, 96, 91, 93, 94, 96, 84, 86],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'React Native (United States)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 35, 36, 39, 38, 38, 35, 31, 34, 31],
        borderColor: 'rgb(255, 99, 132)', // Different color for React Native
        tension: 0.1,
      },
    ],
  };

  const maxDataValue = Math.max(...adoptionData.datasets.flatMap(dataset => dataset.data)); // Get the highest point of all datasets

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show the legend for both Flutter and React Native
      },
      title: {
        display: true,
        text: 'Flutter vs React Native (United States)',
        color: 'white',
        font: {
          family: berkeleyMonoRegular.style.fontFamily,
          size: 18,
        },
      },
      tooltip: {
        titleFont: {
          family: berkeleyMonoRegular.style.fontFamily,
        },
        bodyFont: {
          family: berkeleyMonoRegular.style.fontFamily,
        },
      },
      afterDraw: function(chart) {
        const ctx = chart.ctx;
        const datasetMeta = chart.getDatasetMeta(0); // Access the first dataset (Flutter)

        // Draw a thicker, semi-transparent line for the glow effect (Flutter)
        ctx.save();
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'rgba(75, 192, 192, 0.4)';
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
        ctx.restore();

        // Draw the original Flutter line on top
        ctx.save();
        ctx.lineWidth = datasetMeta.dataset.options.borderWidth;
        ctx.strokeStyle = datasetMeta.dataset.options.borderColor;
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
        ctx.restore();
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            family: berkeleyMonoRegular.style.fontFamily,
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            family: berkeleyMonoRegular.style.fontFamily,
            size: 14,
          },
        },
        grid: {
          display: false,
        },
        min: 0,
        max: maxDataValue, // Set max to the highest data value
      },
    },
  };

  return (
    <Flex h={boxHeight} direction={['column', 'column', 'row']} borderRadius="20px" 
    bg="rgba(255, 255, 255, 0.1)" 
    p={8} color={textColor} style={{ backdropFilter: 'blur(10px)' }}>
      <Box flex={1} mr={[0, 0, 8]} mb={[8, 8, 0]}>
        <Heading as="h1" color={"#92ebfe"} fontSize={"50px"} mb={4}>
          Flutter vs React Native in the United States
        </Heading>
        <Text fontSize={"25px"} mb={4} fontFamily={berkeleyMonoRegular.style.fontFamily}>
          Dart, powering Flutter, continues to grow in popularity, especially in the mobile development world.
        </Text>
        <Link href="https://dillonnys.com/posts/why-im-betting-on-dart/">
          <Button marginLeft={"auto"} justifyContent={"right"} bg={""} color="#40C4FF">
            Learn more
          </Button>
        </Link>
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Line width={"100%"} height={"100%"} options={chartOptions} data={adoptionData} />
      </Box>
    </Flex>
  );
}
