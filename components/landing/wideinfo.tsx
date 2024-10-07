import { Box, Grid, VStack, Text, Link, Icon } from "@chakra-ui/react";
import { FaTerminal, FaCogs, FaPlug, FaCode } from "react-icons/fa";

// InfoBox Component
const InfoBox = ({ icon, title, description, linkText, linkUrl }) => (
    <VStack align="start" spacing={3} bg={"gray.900"} py={10} px={8}>

        <Icon as={icon} w={6} h={6} color="teal.400" />
        <Text fontWeight="bold" fontSize="lg">
            {title}
        </Text>
        <Text fontSize="md" color="gray.400">
            {description}
        </Text>
        <Link href={linkUrl} color="teal.400" fontWeight="bold" display="flex" alignItems="center">
            {linkText} <Box as="span" ml={1}>&#x2192;</Box>
        </Link>
    </VStack>
);

// WideInfo Component
export const WideInfo = () => {
    return (
        // <Box bg="gray.900" color="white" py={10} px={8} >
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={3} w={1000} >
            <InfoBox

                icon={FaTerminal}
                title="CLI"
                description="Take control of your entire database infrastructure via the command-line using the Turso CLI."
                linkText="Get Started"
                linkUrl="#"
            />
            <InfoBox
                icon={FaCogs}
                title="Platform API"
                description="Create databases and manage replication programmatically using the Platform API."
                linkText="Browse docs"
                linkUrl="#"
            />
            <InfoBox
                icon={FaPlug}
                title="Integrate easily"
                description="Integrate SQLite using any language or framework with open-source SDKs and libSQL protocols."
                linkText="Install"
                linkUrl="#"
            />
            <InfoBox
                icon={FaCode}
                title="Examples"
                description="Learn from ready to go apps and code examples."
                linkText="Browse examples"
                linkUrl="#"
            />
        </Grid>
        // </Box>
    );
};

// export default WideInfo;
