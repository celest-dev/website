import Link from "next/link";
import { getPagesUnderRoute } from "nextra/context";

export default function BlogIndex() {
  const blogs = getPagesUnderRoute("/blog");
  return blogs.map((page) => {
    if (page.kind !== 'MdxPage') return null;
    const { frontMatter, route, meta, name } = page;
    return (
      <div key={route} className="mb-10">
        <h3>
          <Link
            href={route}
            style={{ color: "inherit", textDecoration: "none" }}
            className="block font-semibold mt-8 text-2xl "
          >
            {meta?.title || frontMatter?.title || name}
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
