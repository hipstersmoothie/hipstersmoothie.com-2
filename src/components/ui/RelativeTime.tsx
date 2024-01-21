import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export function getRelativeTime(date: Date) {
  return timeAgo.format(date);
}

export function RelativeTime({
  date,
  style,
}: {
  date: Date;
  style?: React.CSSProperties;
}) {
  return (
    <time style={style} dateTime={date.toISOString()}>
      {getRelativeTime(date)}
    </time>
  );
}
