import React from "react";
import classnames from "classnames";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

interface IProps extends WithStyles<typeof styles> {
  slideDirection: "left" | "right";
  transKey: string;
  className?: string;
}

const animationDuration = 350;

const styles = (theme: Theme) => {
  const slideTransition = theme.transitions.create("transform", {
    duration: animationDuration,
    easing: "cubic-bezier(0.35, 0.8, 0.4, 1)"
  });

  return createStyles({
    transitionContainer: {
      display: "block",
      position: "relative",
      "& > *": {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0
      }
    },
    "slideEnter-left": {
      willChange: "transform",
      transform: "translate(100%)"
    },
    "slideEnter-right": {
      willChange: "transform",
      transform: "translate(-100%)"
    },
    slideEnterActive: {
      transform: "translate(0%)",
      transition: slideTransition
    },
    slideExit: {
      transform: "translate(0%)"
    },
    "slideExitActiveLeft-left": {
      willChange: "transform",
      transform: "translate(-100%)",
      transition: slideTransition
    },
    "slideExitActiveLeft-right": {
      willChange: "transform",
      transform: "translate(100%)",
      transition: slideTransition
    }
  });
};

const SlideTransition: React.SFC<IProps> = ({
  classes,
  className,
  children,
  transKey,
  slideDirection
}) => (
  <TransitionGroup
    className={classnames(classes.transitionContainer, className)}
  >
    <CSSTransition
      key={transKey}
      mountOnEnter
      unmountOnExit
      timeout={animationDuration}
      classNames={{
        enter: (classes as any)[`slideEnter-${slideDirection}`],
        enterActive: classes.slideEnterActive,
        exit: classes.slideExit,
        exitActive: (classes as any)[`slideExitActiveLeft-${slideDirection}`]
      }}
    >
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export default withStyles(styles)(SlideTransition);
