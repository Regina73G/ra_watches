import React from "react";
import "./WorldClockForm.css";

interface FormState {
  city: string; 
  timeZone: number | null;
  errors: {
    timeZoneErr: string;
  }
}

interface FormProps {
  onAddClock: (city: string, timeZone: number) => void;
}

export default class WorldClockForm extends React.Component<FormProps, FormState>{
  constructor(props: FormProps) {
    super(props);
    this.state = {
      city: "",
      timeZone: null,
      errors: {
        timeZoneErr: "",
      }
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm(): boolean {
    const {timeZone, errors} = this.state;
    let isValid = true;
    errors.timeZoneErr = "";

    if(timeZone === null) {
      this.setState(prevState => ({
        errors: {...prevState.errors,timeZoneErr: "Это поле обязательно"}
      }));

      isValid = false;
    } else if(isNaN(timeZone) || timeZone < -12 || timeZone > 12) {
      this.setState(prevState => ({
        errors: {...prevState.errors,timeZoneErr: "Введите число от -12 до 12, включая 0"}
      }));

      isValid = false;
    }

    return isValid;
  }

  handleCityChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({city: e.target.value});
  }

  handleTimezoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      timeZone: value ? parseFloat(value) : null,
      errors: { timeZoneErr: "" }
    });
  };

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const {city, timeZone} = this.state;
    if (this.validateForm()) {
      if (timeZone !== null) {
        this.props.onAddClock(city, timeZone);
        this.setState({city: "", timeZone: null, errors:{timeZoneErr: ""}});
      }
    }
  }

  render() {
    const {city, timeZone, errors} = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form_input-box">
          <label className="form_label" htmlFor="city">Название</label>
          <input 
            className="form_input" 
            name="city" type="text" 
            value={city}
            onChange={this.handleCityChange}
            required
            />
        </div>
        <div className="form_input-box">
          <label className="form_label" htmlFor="timeZone">Временная зона</label>
          <input 
            className="form_input" 
            name="timeZone" 
            type="number" 
            value={timeZone !== null ? timeZone : ""}
            onChange={this.handleTimezoneChange}
            required
            />
          {errors.timeZoneErr && <span className="error">{errors.timeZoneErr}</span>}
        </div>
        <button className="form_btn" type="submit">Добавить</button>
      </form>
    )
  }
}