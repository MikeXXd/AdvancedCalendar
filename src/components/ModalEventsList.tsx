import { format } from "date-fns";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Event } from "../types";
import OneEvent from "./OneEvent";

interface ModalTaskListProps {
  events: Event[];
  day: Date;
  onClose: () => void;
  onEdit: (event: Event) => void;
}

export default function ModalEventsList({
  events,
  day,
  onClose,
  onEdit,
}: ModalTaskListProps) {
  const [isClosing, setIsClosing] = useState(false);

  console.log("isClosing", isClosing);
  useEffect(() => {
    if (isClosing) {
      const modal = document.querySelector(".modal");
      const handleTransitionEnd = () => onClose();
      modal?.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        modal?.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [isClosing, onClose]);

  return createPortal(
    <div className={`modal ${isClosing ? "closing" : ""}`}>
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          {format(day, "d/M/yy")}
          <button onClick={() => setIsClosing(true)} className="close-btn">
            &times;
          </button>
        </div>
        <div className="events">
          {events.map((event) => (
            <OneEvent
              key={event.id}
              event={event}
              openModal={() => onEdit(event)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.querySelector("#modal-container") || document.createElement("div")
  );
}
