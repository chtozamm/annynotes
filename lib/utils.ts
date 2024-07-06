// generateUniqueId generates a 15 characters long string from lowercase letters and digits
export function generateUniqueId(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let uniqueId = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}

// validateId returns true if id is 15 characters long made from lowercase letters and digits
export function validateId(id: string): boolean {
  if (!/^[a-z0-9]{15}$/.test(id)) {
    return false;
  }
  return true;
}

function getFormattedTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// logWithTimestamp prints message to the console and with preceding timestamp
export function logWithTimestamp(message: string) {
  console.log(`${getFormattedTimestamp()} ${message}`);
}

export function logErrorWithTimestamp(message: string) {
  console.error(`${getFormattedTimestamp()} ${message}`);
}

// normalizeName converts underscore-separated parts of a name to spaces and capitalizes each part, preserving hyphens within each part
export function normalizeName(name: string): string {
  return name
    .split("_")
    .map((part) =>
      part
        .split("-")
        .map(
          (subPart) =>
            subPart.charAt(0).toUpperCase() + subPart.slice(1).toLowerCase(),
        )
        .join("-"),
    )
    .join(" ");
}
