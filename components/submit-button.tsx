import { useFormStatus } from "react-dom";

const SubmitButton = ({ innerText }: { innerText: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-primary lg:focus-visible:ring-primary mx-auto mt-4 inline-flex w-full max-w-sm items-center justify-center rounded-xl py-4 text-[0.75em] font-black text-white uppercase outline-none select-none active:opacity-75 disabled:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4"
      type="submit"
      disabled={pending}
    >
      <span className="relative">
        <svg
          className={`${
            !pending && "hidden"
          } absolute top-0 -left-6 mr-3 -ml-1 h-5 w-5 animate-spin text-white`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {innerText}
      </span>
    </button>
  );
};

export default SubmitButton;
