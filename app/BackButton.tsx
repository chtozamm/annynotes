"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        outline: "none",
        border: "none",
        position: "relative",
        fontSize: "1em",
        color: "#aaa",
        width: "fit-content",
        margin: "0 auto",
        background: "none",
        fontFamily: "Ringbearer",
      }}
    >
      <span style={{ position: "absolute", left: "-1.5em" }}>←</span>
      go back
    </button>
  );
}
