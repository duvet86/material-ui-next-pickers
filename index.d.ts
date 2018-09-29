declare module "react-swipeable-views-utils" {
  import ReactSwipeableViews from "react-swipeable-views";

  export interface VirtualizedSlideRendererParams {
    index: number;
  }

  interface VirtualizedComponentProps {
    overscanSlideAfter?: number;
    overscanSlideBefore?: number;
    slideCount?: number;
    slideRenderer?: (params: VirtualizedSlideRendererParams) => JSX.Element;
  }

  interface VirtualizedComponentState {
    indexContainer: number;
    indexStart: number;
    indexStop: number;
  }

  class VirtualizedComponent extends React.Component<
    VirtualizedComponentProps,
    VirtualizedComponentState
  > {
    handleChangeIndex(indexContainer: number, indexLatest: number): void;
    handleTransitionEnd(): void;
    setIndex(index: number, indexContainer: number, indexDiff: number): void;
    setWindow(index: number): void;
  }

  export function virtualize(
    component: typeof ReactSwipeableViews
  ): typeof VirtualizedComponent;
  export default virtualize;
}
