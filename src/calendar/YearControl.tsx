import React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

export interface IProps extends WithStyles<typeof styles> {
  previousYearsValid: () => boolean;
  previousYears: () => void;
  nextYearsValid: () => boolean;
  nextYears: () => void;
}

const styles = createStyles({
  calendarControl: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  }
});

const YearControl: React.SFC<IProps> = ({
  classes,
  previousYearsValid,
  previousYears,
  nextYearsValid,
  nextYears
}) => (
  <div className={classes.calendarControl}>
    <IconButton disabled={!previousYearsValid()} onClick={previousYears}>
      <ChevronLeft />
    </IconButton>
    <IconButton disabled={!nextYearsValid()} onClick={nextYears}>
      <ChevronRight />
    </IconButton>
  </div>
);

export default withStyles(styles)(YearControl);
