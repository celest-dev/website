import { FaBuilding, FaRocket, FaUserAstronaut } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { IconType } from "react-icons";
import { Button } from "../ui/button";
import { Check, XIcon } from "lucide-react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type PricingFeature = {
  type: "pro" | "con";
  description: string;
  pupm?: boolean;
};

type PricingTier = {
  name: string;
  description: string;
  Icon: IconType;
  features: PricingFeature[];
  price?: number | string;
  action: React.ReactNode;
};

function PricingTier({
  name,
  description,
  Icon,
  features,
  price,
  action,
}: PricingTier) {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-col p-4 pt-2">
        <CardTitle className="flex flex-row items-center">
          <Icon className="my-4" />
          <span className="text-xl ml-2">{name}</span>
        </CardTitle>
        <div
          className="m-0 text-2xl font-medium"
          style={{ fontVariant: "small-caps" }}
        >
          {typeof price === "number" ? `$${price} / month` : price}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="border-y list-inside list-none p-4 space-y-2 whitespace-nowrap">
          {features.map((feature) => (
            <li key={feature.description}>
              {feature.type === "pro" && (
                <Check className="inline mr-1 aspect-square w-4 p-0" />
              )}
              {feature.type === "con" && (
                <XIcon className="inline mr-1 aspect-square w-4 p-0" />
              )}
              {feature.description}
              {feature.pupm && (
                <div
                  className={clsx(
                    "m-0 ml-5 text-[0.6rem] text-gray-400",
                    price === "Custom" && "invisible"
                  )}
                >
                  per project per month
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex items-center justify-center px-4 py-2 text-center mt-4">
        <div className="w-[175px]">{action}</div>
      </CardFooter>
    </Card>
  );
}

export default function PricingTable() {
  const posthog = usePostHog();
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <PricingTier
          name="Community"
          description="No credit card required. Always free."
          Icon={FaRocket}
          price="Free"
          features={[
            { type: "pro", description: "3 free projects" },
            { type: "con", description: "Cold starts" },
            { type: "pro", description: "50,000 function calls", pupm: true },
            {
              type: "pro",
              description: "1,000 users",
              pupm: true,
            },
          ]}
          action={
            <Link href="/docs/get-started">
              <Button
                className="w-full"
                onClick={() =>
                  posthog.capture("cta_clicked", {
                    location: "pricing",
                    tier: "community",
                  })
                }
              >
                Get Started
              </Button>
            </Link>
          }
        />
        <PricingTier
          name="Pro"
          description="Perfect for solo developers who need power."
          Icon={FaUserAstronaut}
          price={20}
          features={[
            { type: "pro", description: "3 premium projects" },
            { type: "pro", description: "Unlimited free projects" },
            { type: "pro", description: "500,000 function calls", pupm: true },
            {
              type: "pro",
              description: "10,000 users",
              pupm: true,
            },
          ]}
          action={
            <Link href="https://join.celest.dev/b/28o7tL7x81WJdcQ28c">
              <Button
                className="w-full"
                onClick={() =>
                  posthog.capture("cta_clicked", {
                    location: "pricing",
                    tier: "pro",
                  })
                }
              >
                Sign Up
              </Button>
            </Link>
          }
        />
        <PricingTier
          name="Teams"
          description="Manage organizations and invite your team to collaborate."
          Icon={FaBuilding}
          price="Custom"
          features={[
            { type: "pro", description: "Multiple team members" },
            { type: "pro", description: "Role-based access controls" },
            { type: "pro", description: "Auto-scaling" },
            { type: "pro", description: "Priority support" },
          ]}
          action={
            <Link href="/contact">
              <Button
                className="w-full"
                variant="secondary"
                onClick={() =>
                  posthog.capture("cta_clicked", {
                    location: "pricing",
                    tier: "teams",
                  })
                }
              >
                Contact Us
              </Button>
            </Link>
          }
        />
      </div>
      <h4 className="font-semibold">FAQ</h4>
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => {
          posthog.capture("faq_expand", { value: value });
        }}
      >
        <AccordionItem value="project-types">
          <AccordionTrigger>Free vs. Premium projects</AccordionTrigger>
          <AccordionContent>
            <p>
              The Pro tier includes 3 premium projects and unlimited free
              projects. Free projects have limited resources and cold starts,
              but cost you nothing to run.
            </p>
            <br />
            <p>
              Every premium project comes with an included amount of usage. If
              your project scales beyond these limits, you pay for any
              additional resources as you go.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="usage-free">
          <AccordionTrigger>Free Usage</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableCaption>Usage Limits (per free project)</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Functions</TableHead>
                  <TableHead>Auth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key="included">
                  <TableHead>Included</TableHead>
                  <TableCell>50,000 invocations</TableCell>
                  <TableCell>1,000 monthly active users (MAUs)</TableCell>
                </TableRow>
                <TableRow key="additional">
                  <TableHead>Additional</TableHead>
                  <TableCell>$1 / 10,000 invocations</TableCell>
                  <TableCell>$0.01 / MAU</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="usage-premium">
          <AccordionTrigger>Premium Usage</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableCaption>Usage Limits (per premium project)</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Functions</TableHead>
                  <TableHead>Auth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key="included">
                  <TableHead>Included</TableHead>
                  <TableCell>
                    3 premium
                    <br />
                    &#x221E; free
                  </TableCell>
                  <TableCell>500,000 invocations</TableCell>
                  <TableCell>10,000 monthly active users (MAUs)</TableCell>
                </TableRow>
                <TableRow key="additional">
                  <TableHead>Additional</TableHead>
                  <TableCell>
                    $10 / premium
                    <br />
                    $0 / free
                  </TableCell>
                  <TableCell>$1 / 10,000 invocations</TableCell>
                  <TableCell>$0.01 / MAU</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
