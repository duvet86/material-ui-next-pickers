import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CalendarHeader from "calendar/CalendarHeader";
import CalendarDays from "calendar/CalendarDays";
import CalendarYears from "calendar/CalendarYears";
import CalendarActions from "calendar/CalendarActions";

import { months } from "date";

export interface IProps extends WithStyles<typeof styles> {
  closeCalendar: () => void;
  dateDisabled?: (date: Date) => boolean;
  okToConfirm?: boolean;
  isMobile: boolean;
  mode: "year" | "month";
  previousMonthValid: () => boolean;
  nextMonthValid: () => boolean;
  previousMonth: () => void;
  nextMonth: () => void;
  monthIndexValid: (index: number) => boolean;
  tabIndex: number;
  active: Date;
  selectDate: (date: Date, event: React.MouseEvent<HTMLElement>) => void;
  showYearsCalendar: () => void;
  setToday: () => void;
  confirmDate: (event: React.MouseEvent<HTMLElement>) => void;
  previousYearsValid: () => boolean;
  previousYears: () => void;
  nextYearsValid: () => boolean;
  nextYears: () => void;
  yearIndexValid: (index: number) => boolean;
  yearIndex: number;
  selectCalendarYear: (currentYear?: number | undefined) => () => void;
  year: number;
  yearInvalid: (currentYear: number) => boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    calendarContainer: {
      minWidth: 370,
      minHeight: 450,
      overflow: "hidden"
    },
    monthContainer: {
      minHeight: 400,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    calendarDaysContainer: {
      margin: theme.spacing.unit
    }
  });

const Calendar: React.SFC<IProps> = ({
  classes,
  isMobile,
  mode,
  previousMonthValid,
  nextMonthValid,
  previousMonth,
  nextMonth,
  monthIndexValid,
  tabIndex,
  active,
  dateDisabled,
  selectDate,
  showYearsCalendar,
  okToConfirm,
  setToday,
  closeCalendar,
  confirmDate,
  previousYearsValid,
  previousYears,
  nextYearsValid,
  nextYears,
  yearIndexValid,
  yearIndex,
  selectCalendarYear,
  year,
  yearInvalid
}) => (
  <div
    className={classes.calendarContainer}
    style={{ height: isMobile ? "100%" : undefined }}
  >
    {mode === "month" ? (
      <>
        <CalendarHeader
          previousValid={previousMonthValid}
          nextValid={nextMonthValid}
          previous={previousMonth}
          next={nextMonth}
          slideDirection="left"
          transKey={tabIndex.toString()}
        >
          <Button onClick={showYearsCalendar}>
            {months[tabIndex % 12].long + ", " + Math.floor(tabIndex / 12)}
          </Button>
        </CalendarHeader>
        <div className={classes.monthContainer}>
          <div className={classes.calendarDaysContainer}>
            {monthIndexValid(tabIndex) ? (
              <CalendarDays
                active={active}
                dateDisabled={dateDisabled}
                selectDate={selectDate}
                showYearsCalendar={showYearsCalendar}
                tabIndex={tabIndex}
                slideDirection="left"
              />
            ) : (
              <div key={tabIndex} />
            )}
          </div>
          <div>
            {okToConfirm && (
              <CalendarActions
                setToday={setToday}
                closeCalendar={closeCalendar}
                confirmDate={confirmDate}
              />
            )}
          </div>
        </div>
      </>
    ) : (
      <>
        <CalendarHeader
          previousValid={previousYearsValid}
          nextValid={nextYearsValid}
          previous={previousYears}
          next={nextYears}
          slideDirection="right"
          transKey={yearIndex.toString()}
        >
          <Button onClick={selectCalendarYear()}>
            {yearIndex * 18 + " - " + (yearIndex * 18 + 17)}
          </Button>
        </CalendarHeader>
        <div className={classes.calendarDaysContainer}>
          {yearIndexValid(yearIndex) ? (
            <CalendarYears
              selectCalendarYear={selectCalendarYear}
              yearIndex={yearIndex}
              year={year}
              yearInvalid={yearInvalid}
              slideDirection="right"
            />
          ) : (
            <div key={yearIndex} />
          )}
        </div>
      </>
    )}
  </div>
);

export default withStyles(styles)(Calendar);
