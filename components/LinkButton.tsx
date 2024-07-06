import Link from "next/link";

const LinkButton = ({
  href,
  secondary,
  label,
}: {
  href?: string;
  secondary?: boolean;
  label: string;
}) => (
  <Link
    href={href || "/notes/new"}
    className={`${secondary ? "border-2 border-primary bg-white py-4 text-center text-[0.75em] font-black uppercase text-primary" : "bg-primary text-white outline-none"} mx-auto w-full max-w-sm select-none rounded-xl py-4 text-center text-[0.75em] font-black uppercase active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4`}
  >
    {label}
  </Link>
);

export default LinkButton;
