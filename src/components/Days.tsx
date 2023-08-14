import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import OneDay from "./OneDay";

interface DaysProps {
  visibleMonth: Date;
}

export function Days({ visibleMonth }: DaysProps) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  return (
    <div className="days">
      {days.map((day, index) => (
        <OneDay
          key={day.toString()}
          day={day}
          visibleMonth={visibleMonth}
          index={index}
          localStorageKey={format(day, "dd-MM-yyyy")}
        />
      ))}
    </div>
  );
}

//
