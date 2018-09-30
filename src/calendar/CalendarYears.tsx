import React from "react";
import classnames from "classnames";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { generateYearCalendar } from "date";

export interface IProps extends WithStyles<typeof styles> {
  selectCalendarYear: (year?: number | undefined) => () => void;
  yearIndex: number;
  year: number;
  yearInvalid: (currentYear: number) => boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    years: {
      height: 48,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    invalidInput: {
      color: theme.palette.text.disabled
    }
  });

const CalendarYears: React.SFC<IProps> = ({
  classes,
  selectCalendarYear,
  yearIndex,
  year,
  yearInvalid
}) => (
  <>
    {generateYearCalendar(yearIndex).map((years, index) => (
      <div className={classes.years} key={"years-" + index}>
        {years.map((currentYear, yi) => (
          <Button
            variant={year === currentYear ? "raised" : "flat"}
            disabled={yearInvalid(currentYear)}
            onClick={selectCalendarYear(currentYear)}
            key={"year-" + yi}
          >
            <Typography
              className={classnames({
                [classes.invalidInput]: yearInvalid(currentYear)
              })}
              variant="body1"
            >
              {currentYear}
            </Typography>
          </Button>
        ))}
      </div>
    ))}
  </>
);

export default withStyles(styles)(CalendarYears);
