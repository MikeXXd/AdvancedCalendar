import { endOfDay, format, isBefore, isSameDay, isSameMonth } from "date-fns";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Event } from "../types";
import OneEvent from "./OneEvent";
import ModalEvent from "./ModalEvent";
import ModalEventsList  from "./ModalEventsList";

interface OneDayProps {
  day: Date;
  visibleMonth: Date;
  index: number;
  localStorageKey: string;
}

const ONE_TASK_HEIGHT = 1.88; //in rem units

export default function OneDay({
  day,
  visibleMonth,
  index,
  localStorageKey,
}: OneDayProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<Event | null>(null);
  const [isEventsListModalOpen, setIsEventsListModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(() => {
    const localData = localStorage.getItem(localStorageKey);
    if (localData !== null) return JSON.parse(localData);
    else return [];
  });
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);
  const [eventsFieldHeight, setEventsFieldHeight] = useState<number | null>(null);
  const [visibleEvents, setVisibleEvents] = useState<number | null>(null);
  const eventsHightRef = useRef<HTMLDivElement>(null);

  useEffect(
    // reordering events array
    () =>
      setSortedEvents(
        events.sort((a, b) => {
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
        })
      ),
    [events]
  );

  useEffect(() => {
    //Saving events to locale storage
    if (events.length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(events));
    }
    if (events.length === 0) {
      localStorage.removeItem(localStorageKey);
    }
  }, [events]);

  useLayoutEffect(() => {
    // getting and updating tasks field height in rem units
    if (events.length === 0) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0].contentRect.height !== eventsFieldHeight) {
        const tasksFieldHeightInRemUnits =
          entries[0].contentRect.height /
          parseFloat(getComputedStyle(document.documentElement).fontSize);
        setEventsFieldHeight(parseFloat(tasksFieldHeightInRemUnits.toFixed(2)));
        const quantityOfVisibleTasks = Math.floor(
          tasksFieldHeightInRemUnits / ONE_TASK_HEIGHT
        ); // in rem units
        setVisibleEvents(quantityOfVisibleTasks);
      }
    });

    if (eventsHightRef.current) {
      observer.observe(eventsHightRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [eventsHightRef, visibleEvents, events.length, eventsFieldHeight]);

  // function sortEvents(events: Event[]) {
  //   events.sort((a, b) => {
  //     if (a.allDay && !b.allDay) {
  //       return -1;
  //     } else if (!a.allDay && b.allDay) {
  //       return 1;
  //     } else if (a.allDay && b.allDay) {
  //       return 0;
  //     } else {
  //       if (a.startTime && b.startTime) {
  //         return a.startTime.localeCompare(b.startTime);
  //       } else {
  //         return 0;
  //       }
  //     }
  //   });
  // }

  function addEvent(event: Event) {
    setEvents((currentEvents) => [...currentEvents, event]);
  }

  function updateEvent(event: Event) {
    setEvents((currentEvents) =>
      currentEvents.map((e) => (e.id === event.id ? event : e))
    );
  }

  function deleteEvent() {
    setEvents((currentEvents) =>
      currentEvents.filter((e) => e.id !== isEditModalOpen?.id)
    );
    setIsEditModalOpen(null);
  }

  function handleModalTasksListEdit(event: Event) {
    setIsEditModalOpen(event);
    setIsEventsListModalOpen(false);
  }

  return (
    <>
      <div
        className={`day ${!isSameMonth(day, visibleMonth) && "non-month-day"} ${
          isBefore(endOfDay(day), new Date()) &&
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
        <div className="events" ref={eventsHightRef}>
          {sortedEvents
            .slice(0, visibleEvents ? visibleEvents : undefined)
            .map((event) => (
              <OneEvent
                key={event.id}
                event={event}
                openModal={() => setIsEditModalOpen(event)}
              />
            ))}
        </div>
        {visibleEvents &&
          events.length > visibleEvents &&
          events.length !== visibleEvents && (
            <button
              onClick={() => setIsEventsListModalOpen(true)}
              className="events-view-more-btn"
            >
              +{events.length - visibleEvents} More
            </button>
          )}
      </div>
      {isAddModalOpen && (
        <ModalEvent
          day={day}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={addEvent}
        />
      )}
      {isEditModalOpen !== null && (
        <ModalEvent
          isEditComponent
          day={day}
          event={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(null);
          }}
          onSubmit={updateEvent}
          onDelete={deleteEvent}
        />
      )}
      {isEventsListModalOpen && (
        <ModalEventsList
          day={day}
          events={sortedEvents}
          onClose={() => setIsEventsListModalOpen(false)}
          onEdit={(event) => handleModalTasksListEdit(event)}
        />
      )}
    </>
  );
}
