import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Day from "calendar/Day";
import SlideTransition from "calendar/SlideTransition";

import { days, generateMonthCalendar } from "date";

export interface IProps extends WithStyles<typeof styles> {
  active: Date;
  dateDisabled?: (date: Date) => boolean;
  selectDate: (date: Date, event: React.MouseEvent<HTMLElement>) => void;
  showYearsCalendar: () => void;
  tabIndex: number;
  slideDirection: "left" | "right";
}

const styles = (theme: Theme) =>
  createStyles({
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
    },
    transitionContainer: {
      minHeight: 36 * 6
    }
  });

const CalendarDays: React.SFC<IProps> = ({
  classes,
  active,
  dateDisabled,
  selectDate,
  tabIndex,
  slideDirection
}) => (
  <>
    <div className={classes.week}>
      {days.map(({ short }, index) => (
        <Typography
          key={"weeklabel-" + index}
          className={classes.labelWeekDay}
          variant="body1"
        >
          {short}
        </Typography>
      ))}
    </div>

    <SlideTransition
      slideDirection={slideDirection}
      transKey={tabIndex.toString()}
      className={classes.transitionContainer}
    >
      <div>
        {generateMonthCalendar(tabIndex).map((week, index) => (
          <div className={classes.week} key={"week-" + index}>
            {week.map((date, weekIndex) => (
              <Day
                key={"day-" + weekIndex}
                active={active}
                dateDisabled={dateDisabled}
                selectDate={selectDate}
                date={date}
              />
            ))}
          </div>
        ))}
      </div>
    </SlideTransition>
  </>
);

export default withStyles(styles)(CalendarDays);
