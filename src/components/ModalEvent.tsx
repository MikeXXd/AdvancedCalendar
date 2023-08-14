import { format } from "date-fns";
import { FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { Event } from "../types";
import EventColors from "./EventColors";

interface ModalTaskProps {
  isEditComponent?: boolean;
  event?: Event;
  onClose: () => void;
  day: Date;
  onSubmit: (events: Event) => void;
  onDelete?: () => void;
}

const EVENT_COLORS = ["blue", "red", "green"];

export default function ModalEvent({
  isEditComponent,
  event = {
    id: crypto.randomUUID(),
    name: "",
    allDay: false,
    startTime: "",
    endTime: "",
    color: EVENT_COLORS[0],
  },
  day,
  onClose,
  onSubmit,
  onDelete,
}: ModalTaskProps) {
  const [name, setName] = useState(event.name);
  const [allDay, setAllday] = useState(event.allDay);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [selectedColor, setColor] = useState(event.color);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const id = event.id;
    const color = selectedColor;
    onSubmit({ id, name, allDay, startTime, endTime, color });
    onClose();
  }

  function handleDelete() {
    onDelete?.();
    onClose();
  }

  return createPortal(
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          <div>{isEditComponent ? "Edit Event" : "Add Event"}</div>
          <small>{format(day, "d/M/yy")}</small>
          <button onClick={() => onClose()} className="close-btn">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {" "}
            {/*------- Name --*/}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group checkbox">
            {" "}
            {/*------- All day --*/}
            <input
              type="checkbox"
              name="all-day"
              id="all-day"
              onChange={(e) => setAllday(e.target.checked)}
              defaultChecked={allDay}
            />
            <label htmlFor="all-day">All Day?</label>
          </div>
          <div className="row">
            <div className="form-group">
              {" "}
              {/*------- Start Time --*/}
              <label htmlFor="start-time">Start Time</label>
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required={!allDay}
                disabled={allDay}
                type="time"
                name="start-time"
                id="start-time"
              />
            </div>
            <div className="form-group">
              {" "}
              {/*------- End Time --*/}
              <label htmlFor="end-time">End Time</label>
              <input
              min={startTime}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required={!allDay}
                disabled={allDay}
                type="time"
                name="end-time"
                id="end-time"
              />
            </div>
          </div>
          <div className="form-group">
            {" "}
            {/*------- EventColors --*/}
            <label>Color</label>
            <div className="row left">
              {EVENT_COLORS.map((color) => (
                <EventColors key={color}
                  selectedColor={selectedColor}
                  color={color}
                  setColor={() => setColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="row">
            {" "}
            {/*------- SUBMIT - EDIT - DELETE BTN--*/}
            <button className="btn btn-success" type="submit">
              {isEditComponent ? "Edit" : "Add"}
            </button>
            {isEditComponent && (
              <button
                onClick={handleDelete}
                className="btn btn-delete"
                type="button"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.querySelector("#modal-container") || document.createElement("div")
  );
}
