import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Code, Server, Gauge } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faBoltLightning,
  faCloudArrowDown,
  faWandMagic,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import Newsletter from "./Newsletter";
import EmailForm from "./EmailForm";

const chartData = [
  {
    year: 2019,
    flutter: 30,
    reactNative: 44,
    jetpackCompose: 0,
  },
  {
    year: 2020,
    flutter: 34,
    reactNative: 23,
    jetpackCompose: 0,
  },
  {
    year: 2021,
    flutter: 44,
    reactNative: 28,
    jetpackCompose: 0,
  },
  {
    year: 2022,
    flutter: 87,
    reactNative: 49,
    jetpackCompose: 0,
  },
  {
    year: 2023,
    flutter: 85,
    reactNative: 45,
    jetpackCompose: 4,
  },
  {
    year: 2024,
    flutter: 85,
    reactNative: 46,
    jetpackCompose: 7,
  },
];

const chartConfig = {
  flutter: {
    label: "Flutter",
    color: "#027DFD",
  },
  reactNative: {
    label: "React Native",
    color: "#61dbfb",
  },
  jetpackCompose: {
    label: "Jetpack Compose",
    color: "#3cdc84",
  },
} satisfies ChartConfig;

export default function Content() {
  return (
    <>
      <section
        id="flutter-is-changing-the-game"
        className="max-w-[800px] m-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Flutter is on the rise 🚀
            </CardTitle>
            <CardDescription className="text-center mt-2">
              Flutter is growing faster than ever before, all around the world.
            </CardDescription>
          </CardHeader>
          <CardContent className="sm:flex flex-row sm:space-x-4 justify-center items-center">
            <p
              className="flex-2 text-2xl"
              style={{ fontFamily: "var(--font-berkeley-mono)" }}
            >
              Flutter continues to solidify its place as the leading
              cross-platform framework.
              <br />
              <Link
                className="text-sm underline"
                href="https://trends.google.com/trends/explore?date=today%205-y&q=%2Fg%2F11f03_rzbg,%2Fg%2F11h03gfxy9,%2Fg%2F11s98vyc5t&hl=en"
              >
                Source
              </Link>
            </p>
            <ChartContainer config={chartConfig} className="w-full flex-3">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.toString()}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="flutter"
                  name="Flutter"
                  type="natural"
                  stroke="var(--color-flutter)"
                  legendType="line"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-flutter)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
                <Line
                  dataKey="reactNative"
                  name="React Native"
                  type="natural"
                  stroke="var(--color-reactNative)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-reactNative)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
                <Line
                  dataKey="jetpackCompose"
                  name="Jetpack Compose"
                  type="natural"
                  stroke="var(--color-jetpackCompose)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-jetpackCompose)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
                <ChartLegend className="w-full flex-1">
                  <ChartLegendContent />
                </ChartLegend>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
      <hr className="my-12" />
      <section id="celest-dart-flutter" className="max-w-[800px] m-auto text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Celest 💙 Dart + Flutter
            </CardTitle>
            <CardDescription className="text-center mt-2">
              Hover on the cards to see how Dart + Flutter give Celest its magic
              🪄
            </CardDescription>
            <Button size="sm" className="max-w-[200px] mx-auto !mt-6 !mb-2">
              <Link href="/docs">Get Started</Link>
            </Button>
          </CardHeader>
          <CardContent style={{ fontFamily: "var(--font-berkeley-mono)" }}>
            <div className="w-full h-full text-md font-semibold grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex flex-col h-full items-center justify-center rounded-md border-2 border-primary bg-popover hover:bg-accent hover:text-accent-foreground p-4">
                    <Code className="mb-3" size={30} />
                    Dart Cloud Functions
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-center">
                  <p>Write your backend like you write your Flutter app.</p>
                  <br />
                  <p>No context switching, no new languages to learn.</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex flex-col h-full items-center justify-center rounded-md border-2 border-primary bg-popover hover:bg-accent hover:text-accent-foreground p-4">
                    <Server className="mb-3" size={30} />
                    Flutter on the Server
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-center">
                  <p>Run your Flutter code on the server.</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex flex-col h-full items-center justify-center rounded-md border-2 border-primary bg-popover hover:bg-accent hover:text-accent-foreground p-4">
                    <FontAwesomeIcon
                      icon={faCloudArrowDown}
                      className="mb-3"
                      size="xl"
                    />
                    Server-Side Widgets{" "}
                    <span className="text-xs">(Coming soon)</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-center">
                  <p>Build your UI on the server with Flutter.</p>
                  <br />
                  <p>Skip the App Stores and UI changes instantly.</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex flex-col h-full items-center justify-center rounded-md border-2 border-primary bg-popover hover:bg-accent hover:text-accent-foreground p-4">
                    <FontAwesomeIcon
                      icon={faBoltLightning}
                      className="mb-3"
                      size="xl"
                    />
                    Hot Reload
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-center">
                  <p>Instantly reload your backend code as you build.</p>
                  <br />
                  <p>Just like Flutter!</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex flex-col h-full items-center justify-center rounded-md border-2 border-primary bg-popover hover:bg-accent hover:text-accent-foreground p-4">
                    <FontAwesomeIcon
                      icon={faWandMagicSparkles}
                      className="mb-3"
                      size="xl"
                    />
                    Auto-Serialization
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-center">
                  <p>Pass any Dart class between your frontend and backend.</p>
                  <br />
                  <p>We'll handle the details.</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex flex-col h-full items-center justify-center rounded-md border-2 border-primary bg-popover hover:bg-accent hover:text-accent-foreground p-4">
                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      className="mb-3"
                      size="xl"
                    />
                    Client Generation
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-center">
                  <p>Your Dart code is the source of truth.</p>
                  <br />
                  <p>We'll make sure your frontend code is always in sync.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardContent>
        </Card>
      </section>
      <hr className="my-12" />
      <section id="newsletter" className="max-w-[800px] m-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Stay in the loop ✉️
            </CardTitle>
            <CardDescription className="text-center mt-2">
              Subscribe to our newsletter for the latest updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmailForm className="w-full" />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
