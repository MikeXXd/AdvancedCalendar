import { addMonths, format } from "date-fns";

interface HeaderProps {
  visibleMonth: Date;
  setVisibleMonth: (date: Date) => void;
}

export function Header({ visibleMonth, setVisibleMonth }: HeaderProps) {
  function moveMonthsBy(months: number) {
    const newVisibleMonth = addMonths(visibleMonth, months);
    setVisibleMonth(newVisibleMonth);
  }

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
      <div>
        <button onClick={undefined} className="btn">
          about App
        </button>
        <button onClick={undefined} className="btn">
          setting
        </button>
      </div>
    </div>
  );
}
