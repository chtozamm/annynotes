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
    className={`${
      secondary
        ? "border-primary text-primary border-2 bg-white py-4 text-center text-[0.75em] font-black uppercase"
        : "bg-primary text-white outline-none"
    } lg:focus-visible:ring-primary mx-auto w-full max-w-sm rounded-xl py-4 text-center text-[0.75em] font-black uppercase select-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4`}
  >
    {label}
  </Link>
);

export default LinkButton;
