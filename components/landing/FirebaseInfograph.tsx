import { useColorModeValue, Box, Heading, SimpleGrid, VStack, Icon, Text } from "@chakra-ui/react";
import { FaDatabase, FaVectorSquare, FaRobot, FaShieldAlt } from "react-icons/fa";


export const FirebaseInfograph = () => {
    const cardBg = useColorModeValue("gray.700", "gray.800"); // Background color for the cards
    const textColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.800"); // Text color

    return (
        <Box bg="gray.900" color="white" p={8} borderRadius="lg" w={1500}>
            <Heading mb={8} fontSize="2xl" textAlign="center">
                Firebase Infographic
            </Heading>
            <SimpleGrid columns={{ base: 4, md: 4 }} spacing={8}>
                {/* Scalable Section - spans across 2 columns */}
                <VStack
                    p={5}
                    bg={cardBg}
                    borderRadius="lg"
                    shadow="lg"
                    spacing={4}
                    alignItems="start"
                    gridColumn={{ base: "span 1", md: "span 2" }}
                >
                    <Icon as={FaDatabase} boxSize={10} />
                    <Text fontWeight="bold" fontSize="lg">
                        Scalable
                    </Text>
                    <Text>
                        Simplify per-tenant database architecture, enabling you to effortlessly offer dedicated
                        databases for each user, region, or cluster.
                    </Text>
                    <Text>500 - Starter & Hobby Plans</Text>
                    <Text>10,000 - Scaler Plan</Text>
                    <Text>Unlimited - Pro & Enterprise Plans</Text>
                </VStack>

                {/* AI & Embeddings Section */}
                <VStack
                    p={5}
                    bg={cardBg}
                    borderRadius="lg"
                    shadow="lg"
                    spacing={4}
                    alignItems="start"
                    gridColumn={{ base: "span 1", md: "span 1" }}

                >
                    <Icon as={FaVectorSquare} boxSize={10} />
                    <Text fontWeight="bold" fontSize="lg">
                        AI & Embeddings
                    </Text>
                    <Text>
                        Firebase has native Vector Search with support for exact and approximate nearest
                        neighbor search.
                    </Text>
                </VStack>

                {/* Simple & Fast Section */}
                <VStack
                    p={5}
                    bg={cardBg}
                    borderRadius="lg"
                    shadow="lg"
                    spacing={4}
                    alignItems="start"
                >
                    <Icon as={FaRobot} boxSize={10} />
                    <Text fontWeight="bold" fontSize="lg">
                        Simple & Fast
                    </Text>
                    <Text>
                        Start local, deploy when ready. Embed databases right inside your server or mobile app
                        for zero network latency.
                    </Text>
                </VStack>

                {/* API First Section */}
                <VStack
                    p={5}
                    bg={cardBg}
                    borderRadius="lg"
                    shadow="lg"
                    spacing={4}
                    alignItems="start"
                >
                    <Icon as={FaShieldAlt} boxSize={10} />
                    <Text fontWeight="bold" fontSize="lg">
                        API First
                    </Text>
                    <Text>
                        Firebase comes with a powerful Platform API to build with, so you can create databases,
                        manage replication, and more.
                    </Text>
                </VStack>

                {/* Open Source Section */}
                <VStack
                    p={5}
                    bg={cardBg}
                    borderRadius="lg"
                    shadow="lg"
                    spacing={4}
                    alignItems="start"
                >
                    <Icon as={FaVectorSquare} boxSize={10} />
                    <Text fontWeight="bold" fontSize="lg">
                        Open Source
                    </Text>
                    <Text>
                        Firebase is powered by libSQL, the open contribution fork of SQLite, so your data is
                        portable.
                    </Text>
                </VStack>

                {/* Secure and Compliant Section - spans across 2 columns */}
                <VStack
                    p={5}
                    bg={cardBg}
                    borderRadius="lg"
                    shadow="lg"
                    spacing={4}
                    alignItems="start"
                    gridColumn={{ base: "span 1", md: "span 2" }}
                >
                    <Icon as={FaShieldAlt} boxSize={10} />
                    <Text fontWeight="bold" fontSize="lg">
                        Secure & Compliant
                    </Text>
                    <Text>
                        Firebase is built with security for production deployments in mind, with encryption at
                        rest and in transit.
                    </Text>
                    <Text>SOC2</Text>
                    <Text>HIPAA</Text>
                </VStack>
            </SimpleGrid>
        </Box>
    );
};
