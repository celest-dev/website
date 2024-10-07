import { Box, Container, Flex, Grid, Heading, Icon, useColorModeValue, VStack, Text } from "@chakra-ui/react";
import { FaBolt, FaCog, FaDatabase, FaFire, FaLock, FaRocket, FaStream } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => (
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
const SmallFeature = ({ icon, title, description }) => (
    <Flex align="center">
        <Icon as={icon} boxSize={8} color="green.300" mr={4} />
        <VStack align="start" spacing={1}>
            <Heading size="sm">{title}</Heading>
            <Text fontSize="sm">{description}</Text>
        </VStack>
    </Flex>

);

export function FeatureShowcase() {
    return (
        <Container maxW="container.xl" py={16}>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={16}>
                <FeatureCard
                    icon={FaFire}
                    title="Simplicity"
                    description="It all just works, allowing you to focus on building your product without worrying about infrastructure." />
                <FeatureCard
                    icon={FaDatabase}
                    title="Turso"
                    description="Effortlessly manage and scale your data with integrated Turso Database access." />
                <FeatureCard
                    icon={FaStream}
                    title="Serialization"
                    description="No more toJson/fromJson—automatic serialization lets you focus on business logic." />
            </Grid>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
                <SmallFeature
                    icon={FaBolt}
                    title="Hot Reloading"
                    description="Make code changes and see them live in milliseconds while maintaining the current state." />
                <SmallFeature
                    icon={FaCog}
                    title="Logs and Metrics"
                    description="Gain insights into your application’s performance with integrated logging and metrics." />
                <SmallFeature
                    icon={FaLock}
                    title="HIPAA Compliant"
                    description="Ensure your application meets HIPAA security standards with built-in compliance." />
                <SmallFeature
                    icon={FaRocket}
                    title="Easy to Get Started"
                    description="Start quickly with a streamlined setup process that takes you from zero to deployment." />
                <SmallFeature
                    icon={FaRocket}
                    title="Easy to Get Started"
                    description="Start quickly with a streamlined setup process that takes you from zero to deployment." />
                <SmallFeature
                    icon={FaRocket}
                    title="Easy to Get Started"
                    description="Start quickly with a streamlined setup process that takes you from zero to deployment." />
            </Grid>
        </Container>
    );
}
