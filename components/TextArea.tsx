const TextArea = ({ ...props }) => (
  <textarea
    name="message"
    className="w-full max-w-sm resize-none overflow-hidden rounded-xl border-t-2 border-[#ffb220] px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-[#fffbf7] lg:focus-visible:shadow-md lg:focus-visible:shadow-[#fffbf7]"
    rows={3}
    placeholder="Message"
    autoComplete="off"
    required
    {...props}
  />
);

export default TextArea;
