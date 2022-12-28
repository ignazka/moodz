import * as React from 'react';

interface Props {
  // Callback function to be called when the values are saved
  onSave: (hours: number, minutes: number, seconds: number) => void;
}

interface State {
  hours: number;
  minutes: number;
  seconds: number;
}

class NotificationTimeInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  // Event handler for the hours input field
  handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ hours: parseInt(event.target.value, 10) });
  }

  // Event handler for the minutes input field
  handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ minutes: parseInt(event.target.value, 10) });
  }

  // Event handler for the seconds input field
  handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ seconds: parseInt(event.target.value, 10) });
  }

  // Event handler for the save button
  handleSave = () => {
    this.props.onSave(this.state.hours, this.state.minutes, this.state.seconds);
  }

  render() {
    return (
      <div>
        <label>
          Hours:
          <input type="number" value={this.state.hours} onChange={this.handleHoursChange} />
        </label>
        <br />
        <label>
          Minutes:
          <input type="number" value={this.state.minutes} onChange={this.handleMinutesChange} />
        </label>
        <br />
        <label>
          Seconds:
          <input type="number" value={this.state.seconds} onChange={this.handleSecondsChange} />
        </label>
        <br />
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default NotificationTimeInput;
