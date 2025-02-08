export function FormatTime(time: string): string {
  const date = new Date(time);
  const now = new Date();

  const localDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const localNow = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));

  const diffInSeconds = (localNow.getTime() - localDate.getTime()) / 1000;
  console.log(diffInSeconds);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  } else {
    return new Intl.DateTimeFormat("id-ID", {
      month: "short",
      day: "numeric",
    }).format(localDate);
  }
}
