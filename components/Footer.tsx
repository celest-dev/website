import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div>© {new Date().getFullYear()} Teo, Inc. (Celest)</div>
      <div className="grow" />
      <Link href="/privacy">Privacy Policy</Link>
      <span className="mx-2">&bull;</span>
      <Link href="/tos">Terms of Service</Link>
    </>
  );
}
