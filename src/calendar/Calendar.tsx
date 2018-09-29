import React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import MonthControl from "calendar/MonthControl";
import CalendarDays from "calendar/CalendarDays";
import YearControl from "calendar/YearControl";
import CalendarYears from "calendar/CalendarYears";

import { sameDay } from "date";

export interface IProps extends WithStyles<typeof styles> {
  value: Date;
  onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
  closeCalendar: () => void;
  dateDisabled?: (date: Date) => boolean;
  min?: Date;
  max?: Date;
  okToConfirm?: boolean;
}

export interface IState {
  mode: "year" | "month";
  selected: Date;
  month: number;
  year: number;
  yearIndex: number;
}

const styles = createStyles({
  calendarContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    minWidth: 350
  },
  okToConfirmRow: {
    height: 48,
    padding: "0 6px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

class Calendar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const now = new Date();
    let date = new Date(now.getTime());
    const { min, max } = props;
    if (max && now.getTime() > max.getTime()) {
      date = new Date(max.getTime());
    } else if (min && now.getTime() < min.getTime()) {
      date = new Date(min.getTime());
    }
    this.state = {
      mode: "month",
      selected: props.value,
      month: date.getMonth(),
      year: date.getFullYear(),
      yearIndex: Math.floor(date.getFullYear() / 18)
    };
  }

  public componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        month: value.getMonth(),
        year: value.getFullYear()
      });
    }
  }

  public render() {
    const {
      classes,
      value,
      closeCalendar,
      dateDisabled,
      okToConfirm
    } = this.props;
    const { mode, selected, year, month, yearIndex } = this.state;
    const active = okToConfirm ? selected : value;
    const tabIndex = year * 12 + month;

    const selectCalendarYear = (currentYear?: number) => () =>
      this.selectCalendarYear(currentYear);

    return (
      <div className={classes.calendarContainer}>
        {mode === "month" ? (
          <>
            <MonthControl
              previousMonthValid={this.previousMonthValid}
              nextMonthValid={this.nextMonthValid}
              previousMonth={this.previousMonth}
              nextMonth={this.nextMonth}
              key="calendar-month-control"
            />
            {this.monthIndexValid(tabIndex) ? (
              <div key={tabIndex}>
                <CalendarDays
                  active={active}
                  dateDisabled={dateDisabled}
                  selectDate={this.selectDate}
                  showYearsCalendar={this.showYearsCalendar}
                  tabIndex={tabIndex}
                  generateMonthCalendar={this.generateMonthCalendar}
                />
              </div>
            ) : (
              <div key={tabIndex} />
            )}
            {okToConfirm && (
              <div
                className={classes.okToConfirmRow}
                key="calendar-confirm-button"
              >
                <Button onClick={closeCalendar}>CANCEL</Button>
                <Button onClick={this.confirmDate}>OK</Button>
              </div>
            )}
          </>
        ) : mode === "year" ? (
          <>
            <YearControl
              key="calendar-year-control"
              previousYearsValid={this.previousYearsValid}
              previousYears={this.previousYears}
              nextYearsValid={this.nextYearsValid}
              nextYears={this.nextYears}
            />
            {this.yearIndexValid(yearIndex) ? (
              <CalendarYears
                key={yearIndex}
                selectCalendarYear={selectCalendarYear}
                yearIndex={yearIndex}
                generateYearCalendar={this.generateYearCalendar}
                year={year}
                yearInvalid={this.yearInvalid}
              />
            ) : (
              <div key={yearIndex} />
            )}
          </>
        ) : null}
      </div>
    );
  }

  private selectDate = (date: Date, event: React.MouseEvent<HTMLElement>) => {
    const { onChange, closeCalendar, okToConfirm } = this.props;
    if (okToConfirm) {
      this.setState({ selected: date });
    } else {
      closeCalendar();
      onChange(date, event);
    }
  };

  private confirmDate = (event: React.MouseEvent<HTMLElement>) => {
    const { onChange, closeCalendar, okToConfirm } = this.props;
    if (okToConfirm) {
      closeCalendar();
      onChange(this.state.selected, event);
    }
  };

  private showYearsCalendar = () => {
    const { year } = this.state;
    this.setState({
      mode: "year",
      yearIndex: Math.floor(year / 18)
    });
  };

  private selectCalendarYear = (year?: number) => {
    const { min, max } = this.props;
    const { month } = this.state;
    if (year) {
      this.setState({
        mode: "month",
        year,
        month:
          min && month < min.getMonth() && year === min.getFullYear()
            ? min.getMonth()
            : max && month > max.getMonth() && year === max.getFullYear()
              ? max.getMonth()
              : month
      });
    } else {
      this.setState({
        mode: "month"
      });
    }
  };

  private previousYearsValid = () => {
    const { min } = this.props;
    const { yearIndex } = this.state;
    return (
      yearIndex >= 1 &&
      (min === undefined || yearIndex >= Math.ceil(min.getFullYear() / 18))
    );
  };

  private previousYears = () => {
    const { yearIndex } = this.state;
    this.setState({
      yearIndex: yearIndex - 1
    });
  };

  private nextYearsValid = () => {
    const { max } = this.props;
    const { yearIndex } = this.state;
    return max === undefined || yearIndex < Math.floor(max.getFullYear() / 18);
  };

  private nextYears = () => {
    const { yearIndex } = this.state;
    this.setState({
      yearIndex: yearIndex + 1
    });
  };

  private changeYears = (index: number) => {
    this.setState({
      yearIndex: index
    });
  };

  private yearInvalid = (currentYear: number) => {
    const { min, max } = this.props;
    const { year } = this.state;
    return (
      (min && currentYear < min.getFullYear()) ||
      (max && currentYear > max.getFullYear()) ||
      year === currentYear
    );
  };

  private previousMonthValid = () => {
    const { min } = this.props;
    const { month, year } = this.state;
    return (
      min === undefined || (month > min.getMonth() || year > min.getFullYear())
    );
  };

  private previousMonth = () => {
    const { month, year } = this.state;
    this.setState({
      year: year - (month <= 0 ? 1 : 0),
      month: month <= 0 ? 11 : month - 1
    });
  };

  private nextMonthValid = () => {
    const { max } = this.props;
    const { month, year } = this.state;
    return (
      max === undefined || (month < max.getMonth() || year < max.getFullYear())
    );
  };

  private nextMonth = () => {
    const { month, year } = this.state;
    this.setState({
      year: year + (month >= 11 ? 1 : 0),
      month: month >= 11 ? 0 : month + 1
    });
  };

  // private changeMonth = (index: number) => {
  //   this.setState({
  //     year: Math.floor(index / 12),
  //     month: index % 12
  //   });
  // };

  private dayInvalid = (date: Date) => {
    const { value, min, max } = this.props;
    return (
      (value && sameDay(date, value)) ||
      ((min && date.getTime() < min.setHours(0, 0, 0, 0)) ||
        (max && date.getTime() > max.setHours(0, 0, 0, 0)))
    );
  };

  private yearIndexValid = (index: number) => {
    const { yearIndex } = this.state;
    return index <= yearIndex + 2 && index >= yearIndex - 2;
  };

  private monthIndexValid = (index: number) => {
    const { month, year } = this.state;
    const currentIndex = year * 12 + month;
    return index <= currentIndex + 2 && index >= currentIndex - 2;
  };

  private generateYearCalendar = (index: number) => {
    const years: number[][] = [];
    let counter = 0;
    for (let year = index * 18; year < (index + 1) * 18; year++) {
      if (!years[Math.floor(counter / 3)]) {
        years[Math.floor(counter / 3)] = [year];
      } else {
        years[Math.floor(counter / 3)] = [
          ...years[Math.floor(counter / 3)],
          year
        ];
      }
      counter++;
    }
    return years;
  };

  private generateMonthCalendar = (index: number) => {
    const calendarFocus = {
      year: Math.floor(index / 12),
      month: index % 12
    };
    const firstDay = new Date(calendarFocus.year, calendarFocus.month, 1);
    const daysInWeekInMonth: Array<Array<Date | undefined>> = [
      Array(firstDay.getDay()).fill(undefined)
    ];
    let counter = firstDay.getDay();
    for (
      let day = firstDay;
      day.getMonth() === calendarFocus.month;
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    ) {
      if (!daysInWeekInMonth[Math.floor(counter / 7)]) {
        daysInWeekInMonth[Math.floor(counter / 7)] = [
          new Date(day.getFullYear(), day.getMonth(), day.getDate())
        ];
      } else {
        daysInWeekInMonth[Math.floor(counter / 7)] = [
          ...daysInWeekInMonth[Math.floor(counter / 7)],
          new Date(day.getFullYear(), day.getMonth(), day.getDate())
        ];
      }
      counter++;
    }
    for (
      let day = 6;
      !daysInWeekInMonth[daysInWeekInMonth.length - 1][day];
      day--
    ) {
      daysInWeekInMonth[daysInWeekInMonth.length - 1][day] = undefined;
    }
    return daysInWeekInMonth;
  };
}

export default withStyles(styles)(Calendar);
