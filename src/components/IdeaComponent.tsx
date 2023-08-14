import { format, isSameDay, isSameMonth } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModalTask } from "./ModalEvent";
import { Event } from "../types";
import { Task } from "./OneEvent";

interface OneDayProps {
  day: Date;
  visibleMonth: Date;
  index: number;
}

function sortEvents(events: Event[]) {
  return events.sort((a, b) => {
    if (a.allDay && !b.allDay) {
      return -1;
    } else if (!a.allDay && b.allDay) {
      return 1;
    } else if (a.allDay && b.allDay) {
      return 0;
    } else {
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      } else {
        return 0;
      }
    }
  });
}

export function OneDay({ day, visibleMonth, index }: OneDayProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const sortedEvents = useMemo(() => sortEvents(events), [events]);

  const addEvent = useCallback((event: Event) => {
    setEvents((currentEvents) => [...currentEvents, event]);
  }, []);

  const updateEvent = useCallback((event: Event) => {
    setEvents((currentEvents) =>
      currentEvents.map((e) => (e.id === event.id ? event : e))
    );
  }, []);

  const deleteEvent = useCallback(() => {
    setEvents((currentEvents) =>
      currentEvents.filter((e) => e.id !== isEditModalOpen?.id)
    );
    setIsEditModalOpen(null);
  }, [isEditModalOpen]);

  useEffect(() => {
    console.log("sorting");
  }, [sortedEvents]);

  return (
    <>
      <div
        className={`day ${!isSameMonth(day, visibleMonth) && "non-month-day"} ${
          !isSameMonth(day, visibleMonth) &&
          day.getDate() > 20 &&
          "old-month-day"
        }`}
      >
        <div className="day-header">
          {index < 7 && <div className="week-name">{format(day, "EEE")}</div>}
          <div
            className={`day-number ${isSameDay(day, new Date()) && "today"}`}
          >
            {format(day, "d")}
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="add-event-btn"
          >
            +
          </button>
        </div>
        <div className="events">
          {sortedEvents.map((event) => (
            <Task
              key={event.id}
              event={event}
              openModal={() => setIsEditModalOpen(event)}
            />
          ))}
        </div>
      </div>
      {isAddModalOpen && (
        <ModalTask
          day={day}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={addEvent}
        />
      )}
      {isEditModalOpen !== null && (
        <ModalTask
          isEditComponent
          day={day}
          task={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(null);
          }}
          onSubmit={updateEvent}
          onDelete={deleteEvent}
        />
      )}
    </>
  );
}
