import { usePostHog } from "posthog-js/react";
import { onVideoPlay, onVideoError } from "../src/analytics";
import React from "react";

export function CloudFunctionsDemo(props?: React.ComponentProps<"div">) {
  const posthog = usePostHog();
  return (
    <div {...props}>
      <video
        id="cloud-functions-demo"
        // Use JPEG poster image to avoid long render delays on the video
        // since it's the LCP element.
        poster="/img/cloud-functions-demo.jpg"
        title="Create a Dart Cloud Function with Celest"
        width={550}
        height={310}
        onPlay={(e) => onVideoPlay(posthog, e)}
        onError={(e) => onVideoError(posthog, e)}
        autoPlay={false}
        controls
        playsInline
        disablePictureInPicture
        style={{ width: "80%", margin: "1rem auto" }}
      >
        <source
          src="/img/cloud-functions-demo.webm"
          width={550}
          height={310}
          type="video/webm"
        />
        <source
          src="/img/cloud-functions-demo-hevc.mp4"
          width={550}
          height={310}
          type='video/mp4; codecs="hev1"'
        />
        <source
          src="/img/cloud-functions-demo-avc1.mp4"
          width={550}
          height={310}
          type='video/mp4; codecs="avc1"'
        />
        <track
          default
          kind="captions"
          srcLang="en"
          src="/img/cloud-functions-demo.vtt"
        />
        <CloudFunctionsDemoYouTube />
      </video>
    </div>
  );
}

function CloudFunctionsDemoYouTube() {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/Evs1f0zHpzk?si=HooO9H9Jjx42jaX0"
      title="Create a Dart Cloud Function with Celest"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
