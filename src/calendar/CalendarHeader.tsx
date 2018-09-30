import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import SlideTransition from "calendar/SlideTransition";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

export interface IProps extends WithStyles<typeof styles> {
  previousValid: () => boolean;
  nextValid: () => boolean;
  previous: () => void;
  next: () => void;
  slideDirection: "left" | "right";
  transKey: string;
}

const styles = (theme: Theme) =>
  createStyles({
    switchHeader: {
      display: "flex",
      alignItems: "center"
    },
    transitionContainer: {
      width: "100%",
      height: 33
    },
    iconButton: {
      zIndex: 2,
      backgroundColor: theme.palette.background.paper,
      "& > *": {
        // label
        backgroundColor: theme.palette.background.paper,
        "& > *": {
          // icon
          zIndex: 1,
          overflow: "visible"
        }
      }
    }
  });

const CalendarControl: React.SFC<IProps> = ({
  classes,
  previousValid,
  nextValid,
  previous,
  next,
  slideDirection,
  transKey,
  children
}) => (
  <div className={classes.switchHeader}>
    <IconButton
      disabled={!previousValid()}
      onClick={previous}
      className={classes.iconButton}
    >
      <ChevronLeft />
    </IconButton>

    <SlideTransition
      slideDirection={slideDirection}
      transKey={transKey}
      className={classes.transitionContainer}
    >
      <Typography align="center" variant="body1">
        {children}
      </Typography>
    </SlideTransition>

    <IconButton
      disabled={!nextValid()}
      onClick={next}
      className={classes.iconButton}
    >
      <ChevronRight />
    </IconButton>
  </div>
);

export default withStyles(styles)(CalendarControl);
