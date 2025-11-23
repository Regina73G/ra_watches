import React from "react";
import "./WorldClock.css";

interface WorldClockState {
  time: string;
}

interface WorldClockProps {
  city: string; 
  timeZone: number;
  id: string;
  onRemove: (id: string) => void;
}

export default class WorldClock extends React.Component<WorldClockProps, WorldClockState>{
  private timerId: number | null = null;

  constructor(props: WorldClockProps) {
    super(props);
    this.state = {
      time: this.calculateTime(props.timeZone),
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      const { timeZone } = this.props;
      this.setState({time: this.calculateTime(timeZone)});
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  calculateTime(timeZone: number): string {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + timeZone * 3600000);

    return cityTime.toLocaleTimeString("en-GB", {hour12: false});
  }

  render() {
    const {city, id, onRemove} = this.props;
    const {time} = this.state;

    return (
      <div className="world-clock" id={id}>
        <h3 className="world-clock_city">{city}</h3>
        <p className="world-clock_time">{time}</p>
        <button className="world-clock_remove-btn" onClick={() => onRemove(id)}>X</button>
      </div>
    )
  }
}