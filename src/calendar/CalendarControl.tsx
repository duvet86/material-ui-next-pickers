import React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

export interface IProps extends WithStyles<typeof styles> {
  previousValid: () => boolean;
  nextValid: () => boolean;
  previous: () => void;
  next: () => void;
}

const styles = createStyles({
  calendarControl: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  }
});

const CalendarControl: React.SFC<IProps> = ({
  classes,
  previousValid,
  nextValid,
  previous,
  next
}) => (
  <div className={classes.calendarControl}>
    <IconButton disabled={!previousValid()} onClick={previous}>
      <ChevronLeft />
    </IconButton>
    <IconButton disabled={!nextValid()} onClick={next}>
      <ChevronRight />
    </IconButton>
  </div>
);

export default withStyles(styles)(CalendarControl);
