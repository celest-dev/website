import { PostHogProvider } from "posthog-js/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import localFont from "next/font/local";
import { loadIntercom } from "./Intercom";
import { useRouter } from "next/router";

import { ChakraProvider, HStack, VStack } from '@chakra-ui/react'
import CodeBlock from "@components/landing/codeblock"



const poppins = localFont({
  preload: true,
  src: "../public/fonts/Poppins.woff2",
  display: "swap",
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  const mainRef = useRef(null); // Create a ref for <main>

  const { asPath } = useRouter();
  const isContactPage = asPath === "/contact";
  if (isContactPage) {
    useEffect(() => {
      loadIntercom();
    }, []);
  }

  return (

    <ChakraProvider>
      <PostHogProvider
        apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
        options={{
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        }}
      >
        {/* <PersistentLayout starsRef={mainRef}> */}

        {isContactPage && (
          <>
            <link
              rel="preconnect"
              href="https://widget.intercom.io"
              crossOrigin=""
            />
            <link
              rel="preconnect"
              href="https://js.intercomcdn.com"
              crossOrigin=""
            />
            <link
              rel="preconnect"
              href="https://downloads.intercomcdn.com"
              crossOrigin=""
            />
            <link
              rel="preconnect"
              href="https://api-iam.intercom.io"
              crossOrigin=""
            />
          </>
        )}
        {/* <Stars mainRef={mainRef}/> */}

        <div style={{ overflow: "hidden", background: 'linear-gradient(to bottom, #000000, #1e3a8a)' }}>

          <main ref={mainRef} className={`${poppins.variable}`}>

            {/* <NormalComponent/> */}

            <FineGrained containerRef={mainRef} />




            <Component {...pageProps} />


            {/* <CodeBlock
  code={`const hello = 'Hello, world!';`}
  language="javascript"
/> */}

            {/* <PricingCards/> */}
            <SpeedInsights />


          </main>
          {/* <PersistentLayout/> */}

        </div>
      </PostHogProvider>

    </ChakraProvider>

  );
}


import { observable } from "@legendapp/state";
import { useObservable, Memo, reactive } from "@legendapp/state/react";
import { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import { motion } from "framer-motion";

// Making the motion.div reactive to changes from @legendapp/state
const MotionDiv = reactive(motion.div);

function FineGrained({ containerRef }) {
  const [containerSize, setContainerSize] = useState({ width: 800, height: 500 });
  const stars$ = useObservable([]);
  const [starsToSpawn, setStarsToSpawn] = useState(100); // Total number of stars to spawn
  const [starsSpawned, setStarsSpawned] = useState(0); // Track how many stars are spawned


  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerSize({
          width: offsetWidth,
          height: offsetHeight,
        });
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, [containerRef]);

  // // Set container size when the component mounts or the container changes size
  // useEffect(() => {
  //   const updateContainerSize = () => {
  //     if (containerRef.current) {
  //       const { offsetWidth, offsetHeight } = containerRef.current;
  //       setContainerSize({
  //         width: offsetWidth,
  //         height: offsetHeight,
  //       });
  //     }
  //   };

  //   updateContainerSize(); // Initial call to set size
  //   window.addEventListener("resize", updateContainerSize); // Update on window resize

  //   return () => window.removeEventListener("resize", updateContainerSize); // Cleanup
  // }, [containerRef]);

  // Function to create a single star
  const createStar = () => {
    const randomSize = Math.random() * 10 + 1;
    const randomBoxShadowBlur = Math.random() * 10 + 5;
    const randomBoxShadowSpread = Math.random() * 4 + 2;
    const randomBoxShadowOpacity = Math.random() * 0.5 + 0.3;

    return {
      scale: randomSize,
      maxScale: randomSize * 1.5,
      minScale: randomSize / 1,
      boxShadowBlur: randomBoxShadowBlur,
      maxBoxShadowBlur: randomBoxShadowBlur * 2,
      minBoxShadowBlur: randomBoxShadowBlur / 2,
      boxShadowSpread: randomBoxShadowSpread,
      maxBoxShadowSpread: randomBoxShadowSpread * 2,
      minBoxShadowSpread: randomBoxShadowSpread / 2,
      boxShadowOpacity: randomBoxShadowOpacity,
      maxBoxShadowOpacity: 0.8,
      minBoxShadowOpacity: 0.3,
      x: Math.random() * containerSize.width, // Use container size for spawning
      y: Math.random() * containerSize.height,
      vx: (Math.random() - 0.5) * 500,
      vy: (Math.random() - 0.5) * 500,
      minVx: Math.random() * 20 + 100,
      minVy: Math.random() * 20 + 100,
      yoyoDirection: Math.random() > 0.5 ? 1 : -1,
    };
  };

  // Spawn stars gradually
  useInterval(() => {
    if (starsSpawned < starsToSpawn) {
      stars$.push(createStar()); // Add a new star
      setStarsSpawned(starsSpawned + 1); // Update the count of spawned stars
    }
  }, 100); // Adjust the interval to control how fast stars are spawned

  // Update star animations and movements
  useInterval(() => {
    stars$.forEach((star$, index) => {
      star$.set(v => {
        let { yoyoDirection } = v;

        let newScale = v.scale + yoyoDirection * 0.5;
        if (newScale > v.maxScale) {
          newScale = v.maxScale;
          yoyoDirection = -1;
        } else if (newScale < v.minScale) {
          newScale = v.minScale;
          yoyoDirection = 1;
        }

        let newBoxShadowBlur = v.boxShadowBlur + yoyoDirection * 0.2;
        if (newBoxShadowBlur > v.maxBoxShadowBlur) {
          newBoxShadowBlur = v.maxBoxShadowBlur;
        } else if (newBoxShadowBlur < v.minBoxShadowBlur) {
          newBoxShadowBlur = v.minBoxShadowBlur;
        }

        let newBoxShadowSpread = v.boxShadowSpread + yoyoDirection * 0.1;
        if (newBoxShadowSpread > v.maxBoxShadowSpread) {
          newBoxShadowSpread = v.maxBoxShadowSpread;
        } else if (newBoxShadowSpread < v.minBoxShadowSpread) {
          newBoxShadowSpread = v.minBoxShadowSpread;
        }

        let newBoxShadowOpacity = v.boxShadowOpacity + yoyoDirection * 0.01;
        if (newBoxShadowOpacity > v.maxBoxShadowOpacity) {
          newBoxShadowOpacity = v.maxBoxShadowOpacity;
        } else if (newBoxShadowOpacity < v.minBoxShadowOpacity) {
          newBoxShadowOpacity = v.minBoxShadowOpacity;
        }

        return {
          ...v,
          x: v.x + v.vx * 0.016,
          y: v.y + v.vy * 0.016,
          vx: Math.abs(v.vx) < v.minVx ? Math.sign(v.vx) * v.minVx : v.vx * 0.999,
          vy: Math.abs(v.vy) < v.minVy ? Math.sign(v.vy) * v.minVy : v.vy * 0.999,
          scale: newScale,
          boxShadowBlur: newBoxShadowBlur,
          boxShadowSpread: newBoxShadowSpread,
          boxShadowOpacity: newBoxShadowOpacity,
          yoyoDirection: yoyoDirection,
        };
      });
    });

    const checkBoundaries = () => {
      stars$.forEach(star$ => {
        star$.set(v => {
          let { x, y, vx, vy } = v;
          const rect = { width: containerSize.width, height: containerSize.height };
          if (x < 0 || x > rect.width) vx = -vx;
          if (y < 0 || y > rect.height) vy = -vy;
          return { ...v, vx, vy };
        });
      });
    };

    checkBoundaries();
  }, 200); // 20 updates per second

  return (
    <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      {stars$.map((star$, index) => (
        <MotionDiv

          key={index}
          className="star"
          style={{

            overflow: "hidden",
            position: 'absolute',
            background: 'linear-gradient(45deg, #ffffff, #ffffff)',
            borderRadius: '50%',
            width: `${star$.get().scale}px`,
            height: `${star$.get().scale}px`,
            // left: `${star$.get().x}px`,
            // top: `${star$.get().y}px`,
            transform: `translate(${star$.get().x}px, ${star$.get().y}px) `,



          }}
          $animate={() => ({
            // width: `${star$.get().scale}px`,
            // height: `${star$.get().scale}px`,
            // left: `${star$.get().x}px`,
            // top: `${star$.get().y}px`,
            transform: `translate(${star$.get().x}px, ${star$.get().y}px) scale(${star$.get().scale / 30})`,

            // Change all properties of the box shadow dynamically
            boxShadow: `0px 0px ${star$.get().boxShadowBlur}px ${star$.get().boxShadowSpread}px rgba(245, 244, 218, ${star$.get().boxShadowOpacity})`,
            transition: { duration: 0.2, ease: "linear" }
          })}
        />
      ))}
    </div>
  );
}