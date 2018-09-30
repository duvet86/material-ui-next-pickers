import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface IProps extends WithStyles<typeof styles> {}

const styles = (theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: theme.palette.primary.main
    }
  });

const CalendarDays: React.SFC<IProps> = ({ classes }) => (
  <DialogTitle className={classes.title}>Set backup account</DialogTitle>
);

export default withStyles(styles)(CalendarDays);
