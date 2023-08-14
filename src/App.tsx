import { useState } from "react";
import { Header } from "./components/Header";
import { Days } from "./components/Days";

export function App() {
  const [visibleMonth, setVisibleMonth] = useState(new Date());


  return (
    <div>
      <div className="calendar">
        <Header visibleMonth={visibleMonth} setVisibleMonth={setVisibleMonth}  />
        <Days visibleMonth={visibleMonth} />
      </div>
    </div>
  );
}
