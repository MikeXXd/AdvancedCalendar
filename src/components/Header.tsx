import { addMonths, format } from "date-fns";
import { useState } from "react";
import { ModalAbout } from "./ModalAbout";

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

  console.log(isModalAboutOpen);

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
