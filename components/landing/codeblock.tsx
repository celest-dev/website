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
import localFont from "next/font/local";


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


const CodeBlock = ({ code, language = "dart" }) => (
  <VStack w="100%" h={"100%"}>
    <Highlight
      prism={Prism} // Use the extended Prism instance
      theme={themes.nightOwl} // Use the Visual Studio Dark theme
      code={code} // Pass the code prop
      language={language} // Pass the language prop
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: "30px",
            borderRadius: "20px",
            background: "#1e1e1e",
            width: "100%",
            height: "100%",
            fontFamily: berkeleyMonoRegular.style.fontFamily, // Apply the custom font
            fontSize: "25px"
          }}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line })}
              style={{ display: "flex", width: "100%" }}
            >
              <span
                style={{
                  width: "30px", // Space for the line number
                  textAlign: "right",
                  paddingRight: "50px", // Space between number and code
                  userSelect: "none",
                  opacity: "0.5", // Slightly dim the line number
                  fontFamily: berkeleyMonoRegular.style.fontFamily // Apply the custom font
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontFamily: berkeleyMonoRegular.style.fontFamily }}>
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
