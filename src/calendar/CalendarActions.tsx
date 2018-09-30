import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export interface IProps extends WithStyles<typeof styles> {
  setToday: () => void;
  closeCalendar: () => void;
  confirmDate: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    okToConfirmRow: {
      height: 48,
      padding: `0 ${theme.spacing.unit}px`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    button: {
      marginRight: theme.spacing.unit
    }
  });

const CalendarActions: React.SFC<IProps> = ({
  classes,
  setToday,
  closeCalendar,
  confirmDate
}) => (
  <div className={classes.okToConfirmRow} key="calendar-confirm-button">
    <Button size="small" color="primary" onClick={setToday}>
      Today
    </Button>
    <div>
      <Button
        className={classes.button}
        size="small"
        variant="outlined"
        color="primary"
        onClick={closeCalendar}
      >
        Cancel
      </Button>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={confirmDate}
      >
        Ok
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(CalendarActions);
