import React from "react";
import classnames from "classnames";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import { sameDay } from "date";

export interface IProps extends WithStyles<typeof styles> {
  active: Date;
  dateDisabled?: (date: Date) => boolean;
  selectDate: (date: Date, event: React.MouseEvent<HTMLElement>) => void;
  date: Date | undefined;
}

const styles = (theme: Theme) =>
  createStyles({
    weekDay: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: "0 2px",
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium
    },
    selectedDay: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    },
    invalidInput: {
      color: theme.palette.text.disabled
    }
  });

const Day: React.SFC<IProps> = ({
  classes,
  active,
  dateDisabled,
  selectDate,
  date
}) => {
  const selectDateInternal = (dateInput: Date) => (
    event: React.MouseEvent<HTMLElement>
  ) => selectDate(dateInput, event);

  return date ? (
    <IconButton
      className={classnames(classes.weekDay, {
        [classes.selectedDay]: active && sameDay(date, active),
        [classes.invalidInput]: dateDisabled && dateDisabled(date)
      })}
      disabled={dateDisabled && dateDisabled(date)}
      onClick={selectDateInternal(date)}
    >
      {date.getDate()}
    </IconButton>
  ) : (
    <div className={classes.weekDay} />
  );
};

export default withStyles(styles)(Day);
