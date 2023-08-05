export function generateUniqueId() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let uniqueId = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}

export function clearTextAreaValue() {
  const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
  if (textarea) textarea.value = "";
}
export function updateInputValue(value: string) {
  const input = document.querySelector("#inputName") as HTMLInputElement;
  if (input) input.value = value;
}
