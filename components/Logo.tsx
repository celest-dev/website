import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-row items-center text-xl font-bold">
      <Image src="/img/logo-small.webp" alt="Celest Logo" width={40} height={40} />
      <h1 className="ml-1">Celest</h1>
    </div>
  );
}
