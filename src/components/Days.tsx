import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import OneDay from "./OneDay";
import { useMemo } from "react";

interface DaysProps {
  visibleMonth: Date;
}

export function Days({ visibleMonth }: DaysProps) {
  
  const days = useMemo(() => { return eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  })}, [visibleMonth]); 

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
