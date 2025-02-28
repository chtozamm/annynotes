"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ token }: { token: string }) {
  // var prevScrollpos = window.scrollY
  // window.onscroll = function () {
  //   var currentScrollPos = window.scrollY
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("navbar").style.bottom = "0px"
  //   } else {
  //     document.getElementById("navbar").style.bottom = "-100px"
  //   }
  //   prevScrollpos = currentScrollPos
  // }

  const pathname = usePathname();
  return (
    <div
      id="navbar"
      className="border-primary text-primary mb-8 w-screen rounded-3xl bg-white px-4 select-none sm:static sm:bottom-auto sm:border-t-0 lg:px-0"
    >
      <div className="mx-auto flex h-12 w-full max-w-2xl items-center justify-between text-sm font-semibold text-white">
        <Link
          href="/"
          className={`${pathname === "/" && "border-primary text-primary rounded-t-3xl border-t-2 bg-white"} text-primary flex min-w-20 flex-col items-center justify-center pt-2`}
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          href="/profile/notes"
          className={`${pathname === "/profile/notes" && "border-primary text-primary rounded-t-3xl border-t-2 bg-white"} text-primary flex min-w-20 flex-col items-center justify-center pt-2`}
        >
          <EnvelopeIcon />
          My notes
        </Link>
        <Link
          href="/notes/new"
          className={`${pathname === "/notes/new" && "border-primary text-primary rounded-t-3xl border-t-2 bg-white"} text-primary flex min-w-20 flex-col items-center justify-center pt-2`}
        >
          <PlusIcon />
          Share
        </Link>
        {token && token ? (
          <Link
            href="/profile"
            className={`${pathname === "/profile" && "border-primary text-primary rounded-t-3xl border-t-2 bg-white"} text-primary flex min-w-20 flex-col items-center justify-center pt-2`}
          >
            <UserIcon />
            My Profile
          </Link>
        ) : (
          <>
            <Link
              href="/signin"
              className="text-primary flex flex-col items-center justify-center"
            >
              <UserIcon />
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const HomeIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 6.56062L8.00001 2.06062L3.50001 6.56062V13.5L6.00001 13.5V11C6.00001 9.89539 6.89544 8.99996 8.00001 8.99996C9.10458 8.99996 10 9.89539 10 11V13.5L12.5 13.5V6.56062ZM13.78 5.71933L8.70711 0.646409C8.31659 0.255886 7.68342 0.255883 7.2929 0.646409L2.21987 5.71944C2.21974 5.71957 2.21961 5.7197 2.21949 5.71982L0.469676 7.46963L-0.0606537 7.99996L1.00001 9.06062L1.53034 8.53029L2.00001 8.06062V14.25V15H2.75001L6.00001 15H7.50001H8.50001H10L13.25 15H14V14.25V8.06062L14.4697 8.53029L15 9.06062L16.0607 7.99996L15.5303 7.46963L13.7806 5.71993C13.7804 5.71973 13.7802 5.71953 13.78 5.71933ZM8.50001 11V13.5H7.50001V11C7.50001 10.7238 7.72386 10.5 8.00001 10.5C8.27615 10.5 8.50001 10.7238 8.50001 11Z"
      fill="currentColor"
    ></path>
  </svg>
);
const EnvelopeIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.2642 3.5H2.73578L8 8.01219L13.2642 3.5ZM1.5 4.41638V11.5C1.5 12.0523 1.94772 12.5 2.5 12.5H13.5C14.0523 12.5 14.5 12.0523 14.5 11.5V4.41638L8.48809 9.56944L8 9.98781L7.51191 9.56944L1.5 4.41638ZM0 2H1.5H14.5H16V3.5V11.5C16 12.8807 14.8807 14 13.5 14H2.5C1.11929 14 0 12.8807 0 11.5V3.5V2Z"
      fill="currentColor"
    ></path>
  </svg>
);
const PlusIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
      fill="currentColor"
    ></path>
  </svg>
);
const UserIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z"
      fill="currentColor"
    ></path>
  </svg>
);
