import { Container, HStack, Box, VStack, Text } from "@chakra-ui/react";

export const Testimonials = () => {
    return (
        <Container maxW="container.xl" py={10}>
            <HStack spacing={6} justify="center">
                <TestimonialCard
                    logo="Prisma"
                    quote="Multitenancy with Turso has been amazing, super easy to implement. It's made permissions & token management, for Prisma Optimize really simple."
                    author="Pierre-Antoine Urvoy, Prisma" />
                <TestimonialCard
                    logo="Astro"
                    quote="Turso enables us to efficiently scale Astro Studio’s database per tenant architecture to as many users as we’ll ever need, on demand. It’s a game changer."
                    author="Fred K. Schott, Co-creator" />
                <TestimonialCard
                    logo="AZION"
                    quote="We use Turso because it combines the efficiency of SQLite with reliability and scalability additions required by mission-critical applications."
                    author="Rafael Umann, CEO" />
            </HStack>
        </Container>
    );
};
const TestimonialCard = ({ logo, quote, author }) => {
    return (
        <Box
            w="300px"
            h="300px"
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="md"
            p={6}
            color="white"
            textAlign="center"
            boxShadow="lg"
            _hover={{ bg: "rgba(255, 255, 255, 0.15)" }}
            transition="background-color 0.3s"
        >
            <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">{logo}</Text>
                <Text fontSize="md" fontStyle="italic">"{quote}"</Text>
                <Text fontSize="sm" opacity={0.8}>{author}</Text>
            </VStack>
        </Box>
    );
};
