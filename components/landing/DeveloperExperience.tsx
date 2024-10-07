import Link from "next/link";
import { Box, Heading, HStack, Spacer } from "@chakra-ui/react";

import {
    Button,
    Text,
    VStack
} from '@chakra-ui/react';
import CodeBlock from "@components/landing/codeblock";
import { usePostHog } from "posthog-js/react";

import { FeatureShowcase } from "./FeatureShowcase";
import { PricingCards } from "./PricingCards";
import { Testimonials } from "./Testimonials";

const codeBlock99 = `
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await turso.execute("SELECT * FROM users");

await turso.execute({
  sql: "SELECT * FROM users WHERE id = ?",
  args: [1],
});
`;

export const DeveloperExperienceSection = () => {
    return (
        <Box bg="gray.900" w={1000} color="white" py={10} px={8}>
            <HStack maxW="container.xl" mx="auto" spacing={10} align="center">
                {/* Left side: Text and buttons */}
                <VStack align="start" spacing={6} maxW="sm">
                    <Heading fontSize="4xl">Best-in-class developer experience</Heading>
                    <Text fontSize="lg">
                        Build with and integrate SQLite into your production applications.
                    </Text>
                    <Text fontSize="md" opacity={0.7}>
                        Whether you’re building with a single database or millions with a
                        per-tenant architecture for mobile, web or desktop, Turso has all
                        the developer tools you need to integrate in seconds.
                    </Text>
                    <HStack spacing={4}>
                        <Button colorScheme="teal" size="lg">
                            Start Building
                        </Button>
                        <Button colorScheme="gray" size="lg">
                            Quickstart
                        </Button>
                    </HStack>
                </VStack>

                <Spacer />

                {/* Right side: Code Block */}
                <Box
                    bg="gray.800"
                    p={6}

                    borderRadius="lg"
                    boxShadow="lg"
                    borderColor="gray.700"
                    borderWidth="1px"
                // maxW="md"
                >
                    <HStack >


                        <CodeBlock code={codeBlock99} />
                    </HStack>
                </Box>
            </HStack>
        </Box>
    );
};
