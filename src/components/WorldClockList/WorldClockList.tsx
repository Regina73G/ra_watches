import WorldClock from "../WorldClock/WorldClock";
import "./WorldClockList.css";

interface Clock {
  city: string; 
  timeZone: number;
  id:string;
}

interface WorldClockListProps {
  clocks: Clock[];
  onRemoveClock: (id: string) => void;
}

export default function WorldClockList({clocks, onRemoveClock}: WorldClockListProps){

  return (
    <div className="world-clocks-list">
      {clocks.map(clock => (
          <WorldClock 
            key={clock.id}
            id={clock.id}
            city={clock.city} 
            timeZone={clock.timeZone} 
            onRemove={onRemoveClock} 
          />
      ))}
    </div>
  )
}