import React from "react"
import ReactDOM from "react-dom/client"
import { Highlight, themes } from "prism-react-renderer"
import styles from 'styles.module.css'

const codeBlock = `@cloud
Future<String> sayHello(String name) async {
  return 'Hello, $name!';
}`

export const CodeBlock = () => (
  <Highlight
  theme={themes.vsDark} // Use the Visual Studio Dark theme
  code={codeBlock}
    language="dart"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            <span>{i + 1}</span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)


export default CodeBlock;
