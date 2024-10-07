import { Box, Code } from '@chakra-ui/react';

const CodeBlock = () => {
  const code = `
@cloud
Future<String> sayHello(String name) async {
  return 'Hello, $name!';
}`;

  return (
    <Box
      backgroundColor="#1E1E1E" // Visual Studio Dark theme background
      padding="4"
      borderRadius="md"
      overflow="auto"
      whiteSpace="pre"
    >
      <Code
        display="block"
        whiteSpace="pre"
        color="white"
        fontFamily="Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace"
      >
        {code}
      </Code>
    </Box>
  );
};

export default CodeBlock;
