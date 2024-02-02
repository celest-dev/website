import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function Calendar() {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        if (cal && cal.ns) {
          cal.ns.team("ui", {
            styles: { branding: { brandColor: "#042853" } },
            hideEventTypeDetails: true,
            layout: "month_view",
          });
        } else {
          console.error('Cal API not initialized properly');
        }
      } catch (error) {
        console.error('Error fetching Cal API:', error);
      }
    })();
  }, []);

  return (
    <Cal
      namespace="team"
      calLink="celest-dev/meet-website"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: 'month_view'}}
    />
  );
}