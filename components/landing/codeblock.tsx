import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import Prism from "prismjs";
import "prismjs/components/prism-dart"; // Import Dart syntax
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react';

const CodeBlock = ({ code, language = "dart" }) => (
  <VStack padding={5} w="550px">
    <Highlight
      prism={Prism} // Use the extended Prism instance
      theme={themes.nightOwl} // Use the Visual Studio Dark theme
      code={code} // Pass the code prop
      language={language} // Pass the language prop

    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "16px", background: "#1e1e1e", width: "100%" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} style={{ display: "flex", width: "100%" }}>
              <span
                style={{
                  width: "30px", // Space for the line number
                  textAlign: "right",
                  paddingRight: "20px", // Space between number and code
                  userSelect: "none",
                  opacity: "0.5", // Slightly dim the line number
                }}
              >
                {i + 1}
              </span>
              <span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </VStack>
);

export default CodeBlock;
