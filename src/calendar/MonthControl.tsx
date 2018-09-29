import React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

export interface IProps extends WithStyles<typeof styles> {
  previousMonthValid: () => boolean;
  nextMonthValid: () => boolean;
  previousMonth: () => void;
  nextMonth: () => void;
}

const styles = createStyles({
  calendarControl: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  }
});

const MonthControl: React.SFC<IProps> = ({
  classes,
  previousMonthValid,
  nextMonthValid,
  previousMonth,
  nextMonth
}) => (
  <div className={classes.calendarControl}>
    <IconButton disabled={!previousMonthValid()} onClick={previousMonth}>
      <ChevronLeft />
    </IconButton>
    <IconButton disabled={!nextMonthValid()} onClick={nextMonth}>
      <ChevronRight />
    </IconButton>
  </div>
);

export default withStyles(styles)(MonthControl);
