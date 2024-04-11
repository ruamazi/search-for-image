export function truncateText(text) {
  const words = text.split(" ");
  if (words.length > 4) {
    const truncatedText = words.slice(0, 4).join(" ") + "...";
    return truncatedText;
  }
  return text;
}
