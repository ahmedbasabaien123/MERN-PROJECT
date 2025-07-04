export const formatDate = (num) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timestamp = Date.parse(num);

  const date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};
