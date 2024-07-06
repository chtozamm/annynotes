import { useFormStatus } from "react-dom";

const SubmitButton = ({ innerText }: { innerText: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="mx-auto mt-4 inline-flex w-full max-w-sm select-none items-center justify-center rounded-xl bg-primary py-4 text-[0.75em] font-black uppercase text-white outline-none active:opacity-75 disabled:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4"
      type="submit"
      disabled={pending}
    >
      <Spinner visible={pending} innerText={innerText} />
    </button>
  );
};

export default SubmitButton;

const Spinner = ({
  visible,
  innerText,
}: {
  visible: boolean;
  innerText: string;
}) => (
  <span className="relative">
    <svg
      className={`${
        !visible && "hidden"
      } absolute -left-6 top-0 -ml-1 mr-3 h-5 w-5 animate-spin text-white`}
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
);
