// From: https://github.com/lukewarlow/user-agent-data-types/blob/5eafe444181f3d90265c3a939c79f2dae0100f22/index.d.ts

// WICG Spec: https://wicg.github.io/ua-client-hints

type AutoplayMediaType = 'mediaelement' | 'audiocontext';
type AutoplayPolicy = 'allowed' | 'allowed-muted' | 'disallowed';

declare interface Navigator extends NavigatorUA {
    getAutoplayPolicy: (type: AutoplayMediaType) => AutoplayPolicy;
}
declare interface WorkerNavigator extends NavigatorUA {}

// https://wicg.github.io/ua-client-hints/#navigatorua
declare interface NavigatorUA {
    readonly userAgentData?: NavigatorUAData;
}

// https://wicg.github.io/ua-client-hints/#dictdef-navigatoruabrandversion
interface NavigatorUABrandVersion {
    readonly brand: string;
    readonly version: string;
}

// https://wicg.github.io/ua-client-hints/#dictdef-uadatavalues
interface UADataValues {
    readonly brands?: NavigatorUABrandVersion[];
    readonly mobile?: boolean;
    readonly platform?: string;
    readonly architecture?: string;
    readonly bitness?: string;
    readonly formFactor?: string[];
    readonly model?: string;
    readonly platformVersion?: string;
    /** @deprecated in favour of fullVersionList */
    readonly uaFullVersion?: string;
    readonly fullVersionList?: NavigatorUABrandVersion[];
    readonly wow64?: boolean;
}

// https://wicg.github.io/ua-client-hints/#dictdef-ualowentropyjson
interface UALowEntropyJSON {
    readonly brands: NavigatorUABrandVersion[];
    readonly mobile: boolean;
    readonly platform: string;
}

// https://wicg.github.io/ua-client-hints/#navigatoruadata
interface NavigatorUAData extends UALowEntropyJSON {
    getHighEntropyValues(hints: string[]): Promise<UADataValues>;
    toJSON(): UALowEntropyJSON;
}
