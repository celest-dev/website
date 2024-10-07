import React from "react"
import ReactDOM from "react-dom/client"
import { Highlight, themes } from "prism-react-renderer"
import styles from 'styles.module.css'
import Prism from 'prismjs';
import 'prismjs/components/prism-dart'; // Import Dart syntax

const codeBlock = `@cloud
Future<String> sayHello(String name) async {
  return 'Hello, $name!';
}`

export const CodeBlock = () => (
  <Highlight
  prism={Prism} // Use the extended Prism instance

  theme={themes.nightOwl} // Use the Visual Studio Dark theme
  code={codeBlock}
    language="dart"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={{ ...style, padding: '16px', background: '#1e1e1e' }}>
      {tokens.map((line, i) => (
        <div key={i} {...getLineProps({ line })} style={{ display: 'flex' }}>
          <span style={{ 
              width: '30px', /* Space for the line number */
              textAlign: 'right',
              paddingRight: '20px', /* Space between number and code */
              userSelect: 'none',
              opacity: '0.5'  /* Slightly dim the line number */
            }}>
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
)


export default CodeBlock;
