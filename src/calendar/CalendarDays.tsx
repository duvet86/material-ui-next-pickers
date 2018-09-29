import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import CalendarDaysBody from "calendar/CalendarDaysBody";

import { month as dateMonth } from "date";

export interface IProps extends WithStyles<typeof styles> {
  active: Date;
  dateDisabled?: (date: Date) => boolean;
  selectDate: (date: Date, event: React.MouseEvent<HTMLElement>) => void;
  showYearsCalendar: () => void;
  tabIndex: number;
  generateMonthCalendar: (index: number) => Array<Array<Date | undefined>>;
}

const styles = (theme: Theme) =>
  createStyles({
    calendarControlMonth: {
      display: "flex",
      height: 50,
      justifyContent: "center"
    },
    calendarMonthTitle: {
      fontSize: "1rem",
      textTransform: "none"
    },
    week: {
      height: 48,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    labelWeekDay: {
      width: 50,
      color: theme.palette.text.hint,
      lineHeight: "48px",
      textAlign: "center"
    }
  });

const CalendarDays: React.SFC<IProps> = ({
  classes,
  active,
  dateDisabled,
  selectDate,
  showYearsCalendar,
  tabIndex,
  generateMonthCalendar
}) => (
  <>
    <div className={classes.calendarControlMonth}>
      <Button
        onClick={showYearsCalendar}
        classes={{
          root: classes.calendarMonthTitle
        }}
      >
        {dateMonth[tabIndex % 12].long + ", " + Math.floor(tabIndex / 12)}
      </Button>
    </div>
    <div className={classes.week}>
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <Typography
          key={"weeklabel-" + index}
          className={classes.labelWeekDay}
          variant="body1"
        >
          {day}
        </Typography>
      ))}
    </div>
    {generateMonthCalendar(tabIndex).map((week, index) => (
      <CalendarDaysBody
        key={"week-" + index}
        week={week}
        active={active}
        dateDisabled={dateDisabled}
        selectDate={selectDate}
      />
    ))}
  </>
);

export default withStyles(styles)(CalendarDays);
