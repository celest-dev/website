export function loadIntercom() {
    const sdk = import("@intercom/messenger-js-sdk");
    const loader = () => sdk.then(Intercom => Intercom.default({
        app_id: "gxzf8bwj",
    }));
    if (window && window.requestIdleCallback) {
        requestIdleCallback(loader);
    } else {
        setTimeout(loader, 2000);
    }
}