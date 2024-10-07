import { Box, Button, Container, Flex, Heading, Icon, useColorModeValue, VStack, Text } from "@chakra-ui/react";
import { FaBuilding, FaLeaf, FaRobot } from "react-icons/fa";

const PriceCard = ({ title, price, icon, features, buttonText, isPopular }) => (
    <Box
        maxW="sm"
        borderWidth={isPopular ? "2px" : "1px"}
        borderRadius="lg"
        overflow="hidden"
        bg={useColorModeValue("rgba(31, 41, 55, 0.4)", "rgba(17, 17, 17, 0.1)")} // Semi-transparent background
        backdropFilter="blur(5px)" // Apply the blur effect

        // bg={useColorModeValue("gray.800", "gray.900")}
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
);

export function PricingCards() {
    return (
        <Box minH="500" py={16}>
            <Container maxW="container.xl">

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
                        ]} />
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
                        ]} />
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
                        ]} />
                </Flex>
            </Container>
        </Box>
    );
}
