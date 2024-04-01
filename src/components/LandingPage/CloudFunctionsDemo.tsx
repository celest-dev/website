import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { recordEvent } from "@site/src/common/analytics";
import { useEffect, useMemo } from "react";

function onVideoError(e: React.SyntheticEvent<HTMLVideoElement, Event>) {
  recordEvent("video.error", {
    category: "Video playback error",
    success: false,
    errorMessage: e.toString(),
  });
}

export function CloudFunctionsDemo() {
  let shouldAutoplay = false;
  if (ExecutionEnvironment.canUseDOM) {
    shouldAutoplay = useMemo(() => {
      if (navigator && typeof navigator.getAutoplayPolicy === "function") {
        return navigator.getAutoplayPolicy("mediaelement") === "allowed";
      }
      return false;
    }, []);
  }
  useEffect(() => {
    const video = document.getElementById(
      "cloud-functions-demo"
    ) as HTMLVideoElement;
    video.autoplay = shouldAutoplay;
    video.addEventListener(
      "click",
      () => {
        video.muted = false;
        video.loop = false;
        video.textTracks[0].mode = 'hidden';
        setTimeout(() => {
          video.controls = true;
        }, 0);
      },
      { once: true }
    );

    let hasPlayed = false;
    video.addEventListener(
      "play",
      () => {
        hasPlayed = true;
      },
      { once: true }
    );

    // Try to autoplay if the user has interacted with the page.
    let playAttempt: ReturnType<typeof setInterval>;
    if (!shouldAutoplay) {
      setInterval(async () => {
        if (hasPlayed) {
          clearInterval(playAttempt);
          return;
        }
        try {
          await video.play();
          clearInterval(playAttempt);
        } catch {}
      }, 1000);
    }

    return () => {
      if (playAttempt) {
        clearInterval(playAttempt);
      }
    };
  }, []);
  return (
    <div className="hero-media">
      <video
        id="cloud-functions-demo"
        // Use JPEG poster image to avoid long render delays on the video
        // since it's the LCP element.
        poster="/img/cloud-functions-demo.jpg"
        title="Create a Dart Cloud Function with Celest"
        width={550}
        height={310}
        onError={onVideoError}
        autoPlay={false}
        controls={false}
        playsInline
        disablePictureInPicture
        loop
        muted
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
