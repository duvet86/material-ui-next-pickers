import React from "react";
import { render } from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CalendarContainer from "../src/calendar/CalendarContainer";

const theme = createMuiTheme();

interface IState {
  date: Date;
  min: Date;
  max: Date;
  time?: Date;
}

class DemoPage extends React.Component<{}, IState> {
  constructor(props: {}) {
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
    const { date } = this.state;
    return (
      <CalendarContainer
        okToConfirm
        value={date}
        onChange={this.onChangeDate}
        closeCalendar={this.closeCalendar}
      />
    );
  }

  private onChangeDate = (date: Date) => {
    this.setState({ date });
  };

  private closeCalendar = () => {
    // tslint:disable-next-line:no-console
    console.log("close");
  };
}

render(
  <MuiThemeProvider theme={theme}>
    <DemoPage />
  </MuiThemeProvider>,
  document.getElementById("root")
);
