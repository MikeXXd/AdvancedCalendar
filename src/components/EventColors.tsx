
interface ColorsProps {
    selectedColor: string;
    color: string;
    setColor: () => void;
}

export default function EventColors({ selectedColor, color, setColor }: ColorsProps) {
  return (
    <>
      <input
        type="radio"
        name="color"
        value={color}
        id={color}
        checked={color === selectedColor}
        onChange={setColor}
        className="color-radio"
      />
      <label htmlFor={color}>
        <span className="sr-only">{color}</span>
      </label>
    </>
  );
}
