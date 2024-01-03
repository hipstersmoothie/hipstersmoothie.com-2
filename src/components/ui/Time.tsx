import { format } from "date-fns/format";

interface TimeProps {
  date?: string;
  className?: string;
}

export const Time = ({ date, className }: TimeProps) => {
  if (!date) {
    return;
  }

  return (
    <time dateTime={date} className={className}>
      {format(new Date(date), "MMM dd, yyyy")}
    </time>
  );
};
