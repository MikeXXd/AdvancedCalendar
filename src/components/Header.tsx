import { addMonths, format } from "date-fns";
import { useEffect, useState } from "react";
import { ModalAbout } from "./ModalAbout";
import { vi } from "date-fns/locale";

interface HeaderProps {
  visibleMonth: Date;
  setVisibleMonth: (date: Date) => void;
}

export function Header({ visibleMonth, setVisibleMonth }: HeaderProps) {
  const [isModalAboutOpen, setIsModalAbouitOpen] = useState(false);

  function moveMonthsBy(months: number) {
    const newVisibleMonth = addMonths(visibleMonth, months);
    setVisibleMonth(newVisibleMonth);
  }

  useEffect(() => {
    //changing months and years on keyboard
    const keyAction = (e: KeyboardEvent) => {
      if (!e.ctrlKey && e.key === "ArrowLeft") {
        moveMonthsBy(-1);
      } else if (!e.ctrlKey && e.key === "ArrowRight") {
        moveMonthsBy(1);
      } else if (e.key === "Enter") {
        setVisibleMonth(new Date());
      } else if (e.ctrlKey && e.key === "ArrowLeft") {
        moveMonthsBy(-12);
      } else if (e.ctrlKey && e.key === "ArrowRight") {
        moveMonthsBy(12);
      } else return;
    };
    document.addEventListener("keydown", keyAction);

    return () => document.removeEventListener("keydown", keyAction);
  }, [visibleMonth]);

  return (
    <div className="header">
      <div>
        <button onClick={() => setVisibleMonth(new Date())} className="btn">
          Today
        </button>
        <div>
          <button onClick={() => moveMonthsBy(-1)} className="month-change-btn">
            &lt;
          </button>
          <button onClick={() => moveMonthsBy(1)} className="month-change-btn">
            &gt;
          </button>
        </div>
        <span className="month-title">{format(visibleMonth, "MMMM yyyy")}</span>
      </div>
      <p className="info">
        &#10088; button "setting" is not working at this moment, the site is
        under construction &#10089;
      </p>
      <div>
        <button onClick={() => setIsModalAbouitOpen(true)} className="btn">
          About App
        </button>
        <ModalAbout
          isOpen={isModalAboutOpen}
          onClose={() => setIsModalAbouitOpen(false)}
        />
        <button onClick={undefined} className="btn">
          Setting
        </button>
      </div>
    </div>
  );
}
