import { PostHogProvider } from "posthog-js/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import localFont from "next/font/local";
import { loadIntercom } from "./Intercom";
import { useRouter } from "next/router";

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


    <PostHogProvider
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      }}
    >
          <PersistentLayout starsRef={mainRef}>

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
      <main ref={mainRef} className={`${poppins.variable}`}>
   

       
        <Component {...pageProps} />
        <SpeedInsights />
        
      </main>
      </PersistentLayout>

 
    </PostHogProvider>
  
  );
}


const PersistentLayout = ({ children, starsRef }) => {
  return (
    <div>
      <Stars mainRef={starsRef} />
      {children}
    </div>
  );
};





import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

export function Stars({ mainRef }) {
  const starRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(1000);
  const [starPositions, setStarPositions] = useState([]); // To store initial positions
  const router = useRouter();

  const updatePageHeight = () => {
    if (mainRef.current) {
      const newHeight = mainRef.current.offsetHeight; // Use the height of <main>
      setPageHeight(newHeight);
    }
  };

  useEffect(() => {
    // Set initial height and update it on window resize
    updatePageHeight();

    const handleRouteChange = () => {
      setTimeout(updatePageHeight, 100); // Small delay to ensure the new content is rendered
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, mainRef]);

  // Generate initial star positions once on mount
  useEffect(() => {
    if (starPositions.length === 0) {
      const initialPositions = [...Array(50)].map(() => ({
        top: Math.random() * mainRef.current.offsetHeight, // Store top in percentage of page height
        left: Math.random() * mainRef.current.offsetWidth, // Store left in percentage of viewport width
      }));
      setStarPositions(initialPositions); // Store initial positions in state
    }
  }, [starPositions]);

  useEffect(() => {
    let stars = gsap.utils.toArray(".star");

    // Store velocity for each star, including a minimum velocity for each star
    const velocities = stars.map(() => ({
      vx: (Math.random() - 0.5) * 50, // Initial speed on x-axis
      vy: (Math.random() - 0.5) * 50, // Initial speed on y-axis
      minVx: Math.random() * 1 + 10, // Random minimum x velocity
      minVy: Math.random() * 1 + 10, // Random minimum y velocity
    }));

    // Animate stars with friction and boundary collision
    stars.forEach((star, i) => {
      const starEl = star;
      const velocity = velocities[i];

      gsap.fromTo(
        star,
        { scale: 1, opacity: 1, boxShadow: '0px 0px 10px 2px rgba(255, 255, 255, 0.5)' },
        {
          scale: 1.5,
          opacity: 1,
          boxShadow: '0px 0px 20px 4px rgba(255, 255, 255, 0.8)',
          duration: 1.5,
          ease: "linear",
          repeat: -1,
          repeatDelay: 0,
          delay: i * 0.2,
          yoyo: true,
        }
      );

      // Animate each star
      gsap.ticker.add(() => {
        // Update position based on velocity
        let rect = starEl.getBoundingClientRect();

        // Apply friction (gradually reduce velocity)
        velocity.vx *= 0.999;
        velocity.vy *= 0.999;

        // Ensure the velocity never drops below the random minimum velocity
        if (Math.abs(velocity.vx) < velocity.minVx) {
          velocity.vx = Math.sign(velocity.vx) * velocity.minVx;
        }
        if (Math.abs(velocity.vy) < velocity.minVy) {
          velocity.vy = Math.sign(velocity.vy) * velocity.minVy;
        }

        // Update the star's position
        gsap.set(starEl, {
          x: `+=${velocity.vx * 0.016}`, // Multiply by delta time (approx 16ms per frame)
          y: `+=${velocity.vy * 0.016}`,
        });

        // Check for boundary collision (screen edges)
        if (rect.left + velocity.vx < 0 || rect.right + velocity.vx > window.innerWidth) {
          velocity.vx *= -1; // Reverse x velocity if hitting the left or right edge
        }
        if (rect.top + velocity.vy < 0 || rect.bottom + velocity.vy > pageHeight) {
          velocity.vy *= -1; // Reverse y velocity if hitting the top or bottom edge
        }
      });
    });
  }, [starPositions]); // Only run when star positions are set

  return (
    <div>
      <div
        ref={starRef}
        style={{
          position: 'absolute', // Ensure it's positioned relative to the content
          top: 0,
          left: 0,
          width: '100%',
          height: `${pageHeight}px`, // Dynamically set the height based on full page height
          zIndex: -1,
          background: 'linear-gradient(to bottom, #1e3a8a, #000000)',
          overflow: 'hidden',
          filter: 'blur(2px)',
        }}
      >
        {starPositions.map((position, i) => {
          const size = Math.random() * 15 + 3;
          return (
            <div
              key={i}
              className="star"
              style={{
                position: 'absolute',
                top: `${position.top}px`, // Use the percentage stored in starPositions
                left: `${position.left}px`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'linear-gradient(45deg, #ffffff, #ffffff)', // Gradient for star
                borderRadius: '50%',
                boxShadow: '0px 0px 10px 2px rgba(255, 255, 255, 0.5)',
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
