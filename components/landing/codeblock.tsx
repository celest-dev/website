import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-dart'; // Import Dart support

const CodeBlock = ({ code }) => {
    useEffect(() => {
      Prism.highlightAll(); // Re-scan DOM for code blocks
    }, []);
  
    return (
    //   <pre className="language-javascript">
        <code className="language-dart">
          {code}
        </code>
    //   </pre>
    );
  };

export default CodeBlock;