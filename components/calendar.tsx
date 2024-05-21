import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export function useFloatingCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("floatingButton", {
        calLink: "celest-dev/meet-website",
        buttonText: "Book a demo",
        config: {
          layout: "month_view",
        },
      });
      cal("ui", {
        theme: "dark",
        layout: "month_view",
      });
    })();
  }, []);
}

export default function Calendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <Cal
      calLink="accounts-cal/meet-website"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
      calOrigin="https://celest.cal.com"
    />
  );
}
