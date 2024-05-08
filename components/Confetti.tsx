"use client";

import Image from "next/image";
import { useState } from "react";
import { useReward } from "react-rewards";

export default function Confetti() {
  const [isShownContainer, setIsShownContainer] = useState(false);
  const balloonsConfig = {
    lifetime: 600,
    elementCount: 11,
    elementSize: 48,
    spread: 75,
    zindex: 5,
    colors: ["white", "pink", "lightblue"],
  };
  const { reward: animateBalloons, isAnimating: isAnimatingBalloons } =
    useReward("balloonsId", "balloons", balloonsConfig);
  const { reward: animateConfetti, isAnimating: isAnimatingConfetti } =
    useReward("confettiId", "confetti", { spread: 75, zIndex: 10 });
  return (
    <>
      <button
        className="mx-auto mb-4 inline-flex w-full max-w-sm select-none items-center justify-center rounded-xl bg-pink-400 bg-gradient-to-l from-blue-300 via-pink-300 to-pink-200 py-4 text-center text-[0.75em] font-black uppercase text-white outline-none active:opacity-75 disabled:text-primary disabled:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4"
        onClick={() => {
          setIsShownContainer(true);
          document.querySelector("body")!.style.overflow = "hidden";
          setTimeout(() => {
            animateBalloons();
            animateConfetti();
          }, 200);
        }}
        disabled={isShownContainer}
      >
        <span className="relative flex items-center gap-1.5">
          For Anny & Masha
          <svg
            height="18"
            viewBox="0 0 24 24"
            shapeRendering="geometricPrecision"
            width="18"
            className="absolute -right-6 fill-white"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="var(--geist-fill)"
            />
          </svg>
        </span>
      </button>
      {isShownContainer && (
        <div
          className={`fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-between px-8 pb-16 backdrop-blur-2xl`}
        >
          <p />
          <button
            className="absolute right-4 top-4 p-4 text-primary"
            onClick={() => {
              setIsShownContainer(false);
              document.querySelector("body")!.style.overflow = "visible";
            }}
          >
            <svg
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={"/icons/birthday-cake.png"}
                width={64}
                height={64}
                alt="🎂"
                priority
                quality={100}
                className="mb-4 text-6xl"
              />
              <p className="relative z-50 flex flex-col gap-1.5 text-center font-ringbearer text-3xl font-semibold text-white drop-shadow-[0_0px_1.2px_rgba(0,0,0,0.8)]">
                <span>Happy Birthday,</span>
                <span className="text-4xl">Anny & Masha!</span>
              </p>
              <div id="balloonsId" />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <p id="confettiId" className="mb-4" />
            <button
              className="mx-auto inline-flex w-full max-w-sm select-none items-center justify-center rounded-xl bg-primary py-4 text-[0.75em] font-black uppercase text-white outline-none active:opacity-75 disabled:opacity-75"
              onClick={animateBalloons}
            >
              <span className="relative">Spawn balloons!</span>
            </button>
            <button
              className="mx-auto mt-4 inline-flex w-full max-w-sm select-none items-center justify-center rounded-xl bg-primary py-4 text-[0.75em] font-black uppercase text-white outline-none active:opacity-75 disabled:opacity-75"
              onClick={animateConfetti}
            >
              <span className="relative">Spawn confetti!</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
