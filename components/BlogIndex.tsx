import Link from "next/link";
import { MdxFile, Page } from "nextra";
import { getPagesUnderRoute } from "nextra/context";

const pageIsMdx = (page: Page): page is MdxFile => page.kind === "MdxPage";

export default function BlogIndex() {
  const blogs = getPagesUnderRoute("/blog")
    .filter(pageIsMdx)
    .sort((a, b) => {
      const {
        frontMatter: { date: aDateStr, order: aOrder = 0 },
      } = a;
      const {
        frontMatter: { date: bDateStr, order: bOrder = 0 },
      } = b;
      if (aDateStr === bDateStr) return bOrder - aOrder;
      const aDate = new Date(aDateStr);
      const bDate = new Date(bDateStr);
      return bDate.getDate() - aDate.getDate();
    });
  return blogs.map((page) => {
    const { frontMatter, route, name } = page;
    return (
      <div key={route} className="mb-10">
        <h3>
          <Link
            href={route}
            style={{ color: "inherit", textDecoration: "none" }}
            className="block font-semibold mt-8 text-2xl "
          >
            {frontMatter?.title || name}
          </Link>
        </h3>
        <p className="opacity-80 mt-6 leading-7">
          {frontMatter?.description}{" "}
          <span className="inline-block">
            <Link
              href={route}
              className="text-[color:hsl(var(--nextra-primary-hue),100%,50%)] underline underline-offset-2 decoration-from-font"
            >
              Read more →
            </Link>
          </span>
        </p>
        {frontMatter?.date ? (
          <p className="opacity-50 text-sm mt-6 leading-7">
            {frontMatter.date}
          </p>
        ) : null}
      </div>
    );
  });
}
