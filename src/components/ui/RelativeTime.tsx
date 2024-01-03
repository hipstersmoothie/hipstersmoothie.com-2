import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export function RelativeTime({ date }: { date: Date }) {
  return <time dateTime={date.toISOString()}>{timeAgo.format(date)}</time>;
}
