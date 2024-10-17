import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const poppins = await fetch(
      new URL("../../public/fonts/Poppins/Poppins-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const poppinsBold = await fetch(
      new URL(
        "../../public/fonts/Poppins/Poppins-Medium.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());
    const berkeleyMono = await fetch(
      new URL(
        "../../public/fonts/BerkeleyMono-Regular.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    const logo = await fetch(
      new URL("../../public/img/logo-white.png", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const logoUri = `data:image/png;base64,${Buffer.from(logo).toString(
      "base64"
    )}`;

    // ?title=<title>
    let title = searchParams.get("title");
    if (title) {
      title = title.split(" | ")[0].trim().slice(0, 100);
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(115deg, #010512 26.96%, #121f30 80%)",
            color: "white",
            fontFamily: "Berkeley Mono, Poppins, sans-serif",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logoUri}
              alt="Celest Logo"
              style={{
                width: 200,
                height: 200,
                objectFit: "contain",
              }}
            />
            <div
              style={{
                paddingTop: 24,
                marginLeft: 24,
                fontSize: 130,
                fontWeight: 500,
                fontFamily: 'Poppins',
              }}
            >
              Celest
            </div>
          </div>
          {title && (
            <div style={{ marginTop: 28, fontSize: 56, maxWidth: "50%" }}>
              {title}
            </div>
          )}
          <div style={{ marginTop: 28, fontSize: 24 }}>
            The Flutter cloud platform
          </div>
          <div style={{ marginTop: 12, fontSize: 24, color: 'white' }}>&infin; celest.dev</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Poppins",
            data: poppins,
            style: "normal",
            weight: 400,
          },
          {
            name: "Poppins",
            data: poppinsBold,
            style: "normal",
            weight: 600,
          },
          {
            name: "Berkeley Mono",
            data: berkeleyMono,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (error) {
    console.error(`Failed to generate the image: ${error}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
