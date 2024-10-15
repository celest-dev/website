import { Container, HStack, Box, VStack, Text } from "@chakra-ui/react";

export const Testimonials = () => {
    return (
        <Container maxW="container.xl" py={10}>
            <HStack spacing={6} justify="center">
                <TestimonialCard
                    logo="Dart Cloud Functions"
                    quote=""
                    author="Pierre-Antoine Urvoy, Prisma" />
                <TestimonialCard
                    logo="Flutter on the Server"
                    quote=""
                    author="Fred K. Schott, Co-creator" />
                <TestimonialCard
                    logo="Server Side Widgets"
                    quote=""
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
                <Text fontSize="md" fontStyle="italic">{quote}</Text>
                <Text fontSize="sm" opacity={0.8}>{author}</Text>
            </VStack>
        </Box>
    );
};
