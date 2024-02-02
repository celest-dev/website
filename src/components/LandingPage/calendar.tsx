import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function Calendar() {
  return (
    <Cal
      namespace="team"
      calLink="celest-dev/meet-website"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: 'month_view'}}
    />
  );
}