import './App.css'
import WorldClockForm from "./components/WorldClockForm/WorldClockForm";

function App() {
  const onAddClock = (city: string, timeZone: number) => {
    console.log(city, timeZone);
  }

  return (
    <>
      <WorldClockForm onAddClock={onAddClock}/>
    </>
  )
}

export default App
