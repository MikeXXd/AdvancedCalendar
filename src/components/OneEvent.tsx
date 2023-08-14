import { Event } from "../types";

interface TaskProps {
  event: Event;
  openModal: () => void;
}

export default function OneEvent({ event, openModal }: TaskProps) {
  const allDay = event.allDay;

  return (
    <button
      key={event.id}
      onClick={openModal}
      className={allDay ? `all-day-event ${event.color} event` : "event"}
    >
      {allDay ? (
        <div className="event-name">{event.name}</div>
      ) : (
        <>
          <div className={`color-dot ${event.color}`}></div>
          <div className="event-time">{event.startTime}</div>
          <div className="event-name">{event.name}</div>
        </>
      )}
    </button>
  );
}
