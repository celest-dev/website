import type { PostHog } from 'posthog-js';

type EventProps = {
    category?: string;
    errorMessage?: String;
    success?: boolean;
    downloadCLIAutoDetectOperatingSystem?: boolean;
    downloadCLIOperatingSystemName?: string;
    downloadCLIOperatingSystemArchitecture?: string;
};

export const recordEvent = (posthog: PostHog, eventName: string, props?: EventProps) => {
    posthog.capture(eventName, props);
};


export const identifyUser = (posthog: PostHog, email: string) => {
    posthog.setPersonProperties({ email });
};

export function onVideoPlay(
    posthog: PostHog,
    e: React.SyntheticEvent<HTMLVideoElement, Event>
) {
    recordEvent(posthog, "video.play", {
        category: "Video played",
        success: true,
    });
}

export function onVideoError(
    posthog: PostHog,
    e: React.SyntheticEvent<HTMLVideoElement, Event>
) {
    recordEvent(posthog, "video.error", {
        category: "Video playback error",
        success: false,
        errorMessage: e.toString(),
    });
}
