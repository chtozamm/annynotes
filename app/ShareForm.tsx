"use client";

export default function ShareForm() {
  return (
    <button
      className="uppercase bg-[#ffb220] text-white py-4 max-w-sm w-full mx-auto rounded-xl font-black text-[0.75em]"
      onClick={() =>
        alert(
          "You must be logged in to share a note (temporarily unavailable)",
        )}
    >
      Share
    </button>
  );
}
