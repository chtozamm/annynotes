import { ChangeEvent, MouseEvent } from "react"

const onChangeHandler = function (e: ChangeEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLTextAreaElement
  target.style.height = "auto"
  target.style.height = `${target.scrollHeight + 2}px`
}

const onClickHandler = function (e: MouseEvent<HTMLTextAreaElement>) {
  const target = e.target as HTMLTextAreaElement
  target.style.height = "auto"
  target.style.height = `${target.scrollHeight + 2}px`
}

const TextArea = ({ ...props }) => (
  <textarea
    name="message"
    className="w-full max-w-sm resize-none overflow-y-auto rounded-xl border-t-2 border-primary px-2 py-2 outline-none placeholder:text-sm placeholder:text-zinc-400 sm:px-3 sm:py-3 lg:focus-visible:bg-secondary lg:focus-visible:shadow-md lg:focus-visible:shadow-secondary"
    placeholder="Message"
    autoComplete="off"
    required
    rows={3}
    onChange={onChangeHandler}
    onClick={onClickHandler}
    {...props}
  />
)

export default TextArea
