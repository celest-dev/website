import { useRouter } from "next/router";
import { MdxFile } from "nextra";
import { getPagesUnderRoute } from "nextra/context";

export default function Authors({ children, by = "by" }) {
  const currentRoute = useRouter().route;
  const page = getPagesUnderRoute("/blog").find(
    (page) => page.route === currentRoute
  ) as MdxFile;
  const { frontMatter } = page;
  return (
    <div className="mt-4 mb-8 text-gray-500 text-sm text-center">
      {frontMatter.date} {"|"} <Author name="Dillon Nys" link="https://x.com/dillonthedev" />
      {children && (
        <>
          {by} {children}
        </>
      )}
    </div>
  );
}

export function Author({ name, link }) {
  return (
    <span className="after:content-[','] last:after:content-['']">
      <a
        key={name}
        href={link}
        target="_blank"
        className="text-current underline [text-underline-position:from-font] decoration-from-font"
      >
        {name}
      </a>
    </span>
  );
}
