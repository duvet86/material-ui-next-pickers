import React from "react";
import { render } from "react-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

// import DateFormatInput from "../src/datepicker";
// import TimeFormatInput from "../src/timepicker";

import Calendar from "../src/calendar/Calendar";

const theme = createMuiTheme();

const styles = createStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface IState {
  date: Date;
  min: Date;
  max: Date;
  time?: Date;
}

class DemoPage extends React.Component<WithStyles<typeof styles>, IState> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    const now = new Date();
    this.state = {
      date: now,
      min: new Date(now.getTime() - 180 * 86400000),
      max: new Date(now.getTime() + 120 * 86400000),
      time: undefined
    };
  }

  public render() {
    const { classes } = this.props;
    const { date, min, max, time } = this.state;
    return (
      <div className={classes.container}>
        <div>
          <Calendar
            value={date}
            onChange={this.onChangeDate}
            closeCalendar={this.closeCalendar}
          />
          {/* <DateFormatInput
          name="date-input"
          value={date}
          onChange={this.onChangeDate}
          min={min}
          max={max}
          label="Date"
          okToConfirm
        />
        <TimeFormatInput
          name="time-input"
          value={time}
          onChange={this.onChangeTime}
          label="Time"
          selectableMinutesInterval={5}
          dialog
          okToConfirm
        /> */}
        </div>
      </div>
    );
  }

  private onChangeDate = (date: Date) => {
    this.setState({ date });
  };

  private onChangeTime = (time: Date) => {
    this.setState({ time });
  };

  private closeCalendar = () => {
    // tslint:disable-next-line:no-console
    console.log("close");
  };
}

const DemoStyledPage = withStyles(styles)(DemoPage);

render(
  <MuiThemeProvider theme={theme}>
    <DemoStyledPage />
  </MuiThemeProvider>,
  document.getElementById("root")
);
