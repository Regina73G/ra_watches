import './App.css'
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import WorldClockForm from "./components/WorldClockForm/WorldClockForm";
import WorldClockList from './components/WorldClockList/WorldClockList';

interface AppState {
  clocks: {city: string; timeZone: number, id: string}[];
}

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      clocks: [],
    };

    this.addClock = this.addClock.bind(this);
    this.removeClock = this.removeClock.bind(this);
  }

  addClock = (city: string, timeZone: number) => {
    const id = uuidv4();
    this.setState(prevState => ({
      clocks: [...prevState.clocks, {city, timeZone, id}],
    }));
  };

  removeClock = (id: string) => {
    this.setState(prevState => ({
      clocks: prevState.clocks.filter(clock => clock.id !== id),
    }));
  };

  render() {
    const { clocks } = this.state;
    return (
      <div className="app">
        <WorldClockForm onAddClock={this.addClock} />
        <WorldClockList clocks={clocks} onRemoveClock={this.removeClock} />
      </div>
    );
  }
}
