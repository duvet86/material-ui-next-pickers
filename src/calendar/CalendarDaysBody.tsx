import React from "react";
import classnames from "classnames";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { sameDay } from "date";

export interface IProps extends WithStyles<typeof styles> {
  week: Array<Date | undefined>;
  active: Date;
  dateDisabled?: (date: Date) => boolean;
  selectDate: (date: Date, event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    week: {
      height: 48,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    selectedDay: {
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    },
    weekDay: {
      width: 40,
      margin: 5
    },
    selectedDayText: {
      color: theme.palette.primary.contrastText
    },
    invalidInput: {
      color: theme.palette.text.disabled
    }
  });

const CalendarDaysBody: React.SFC<IProps> = ({
  classes,
  week,
  active,
  dateDisabled,
  selectDate
}) => {
  const selectDateInternal = (date: Date) => (
    event: React.MouseEvent<HTMLElement>
  ) => selectDate(date, event);

  return (
    <div className={classes.week}>
      {week.map(
        (date, weekIndex) =>
          date ? (
            <IconButton
              classes={{
                root: classnames(
                  {
                    [classes.selectedDay]: active && sameDay(date, active)
                  },
                  classes.weekDay
                )
              }}
              disabled={dateDisabled && dateDisabled(date)}
              onClick={selectDateInternal(date)}
              key={"day-" + weekIndex}
            >
              <Typography
                classes={{
                  root: classnames({
                    [classes.selectedDayText]: active && sameDay(date, active),
                    [classes.invalidInput]: dateDisabled && dateDisabled(date)
                  })
                }}
                variant="body1"
              >
                {date.getDate()}
              </Typography>
            </IconButton>
          ) : (
            <div className={classes.weekDay} key={"day-" + weekIndex} />
          )
      )}
    </div>
  );
};

export default withStyles(styles)(CalendarDaysBody);
