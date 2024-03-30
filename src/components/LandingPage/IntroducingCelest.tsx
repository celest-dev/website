import { recordEvent } from "@site/src/common/analytics";

function onVideoError(e: React.SyntheticEvent<HTMLVideoElement, Event>) {
  recordEvent("video.error", {
    category: "Video playback error",
    success: false,
    errorMessage: e.toString(),
  });
}

export function IntroducingCelest() {
  return (
    <div className="hero-media">
      <video
        id="introducing-celest"
        controls
        playsInline
        // Use JPEG poster image to avoid long render delays on the video 
        // since it's the LCP element.
        poster="/img/introducing-celest.jpg"
        width={550}
        height={310}
        onError={onVideoError}
        disablePictureInPicture
      >
        <source
          src="/img/introducing-celest.webm"
          width={550}
          height={310}
          type="video/webm"
        />
        <source
          src="/img/introducing-celest.mp4"
          width={550}
          height={310}
          type="video/mp4"
        />
        <track
          default
          kind="captions"
          srcLang="en"
          src="/img/introducing-celest.vtt"
        />
        <IntroducingCelestYouTube />
      </video>
    </div>
  );
}

function IntroducingCelestYouTube() {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/tw-pklTui7E?si=gAwS3MZ1GMLm9XS1"
      title="Introducing Celest"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
