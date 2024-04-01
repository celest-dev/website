import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function useFloatingCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("floatingButton", {
        calLink: "celest-dev/meet-website",
        buttonText: "Book a demo",
        config: {
          layout: "month_view",
        }
      });
      cal("ui", {
        theme: "dark",
        layout: "month_view",
      });
    })();
  }, []);
}
