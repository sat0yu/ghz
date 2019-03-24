import * as React from 'react';
import { connect, Omit } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  queryBrowserOperations,
  queryBrowserSelectors,
} from '../../state/queryBrowser';
import { Direction } from '../../state/queryBrowser/actions';
import { RootState } from '../../state/store';

type InjectedStateProps = ReturnType<typeof mapStateToProps>;
type InjectedDispatchProps = ReturnType<typeof mapDispatchToProps>;
export type InjectedFeedManagerProps = InjectedStateProps &
  InjectedDispatchProps;

const mapStateToProps = (store: RootState) => ({
  feedByQuery: queryBrowserSelectors.getFeedByQuery(store),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      searchRequest: queryBrowserOperations.searchRequest,
    },
    dispatch,
  );

const WithFeedManager = <P extends InjectedFeedManagerProps>(
  Component: React.ComponentType<P>,
) => {
  type OriginalProps = Omit<P, keyof InjectedFeedManagerProps>;
  const mergeProps = (
    stateProps: InjectedStateProps,
    dispatchProps: InjectedDispatchProps,
    ownProps: OriginalProps,
  ) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  });

  class WrappedComponent extends React.Component<P> {
    public duration: number;
    public timer: NodeJS.Timer | null;

    public constructor(props: P) {
      super(props);
      this.duration = 60 * 1000;
      this.timer = null;
      this.reloadFeed = this.reloadFeed.bind(this);
    }

    public componentDidMount() {
      if (!this.timer) {
        this.timer = setInterval(this.reloadFeed, this.duration);
      }
    }

    public componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }

    public render() {
      return <Component {...this.props} />;
    }

    private reloadFeed() {
      const { feedByQuery, searchRequest } = this.props;
      Object.keys(feedByQuery).forEach(key => {
        const feed = feedByQuery[key];
        const { pageInfo, query, isActive = false } = feed;
        // insert the fetched result for the active feed
        isActive
          ? searchRequest({ pageInfo, query, direction: Direction.BEFORE })
          : searchRequest({ pageInfo, query });
      });
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    // tslint:disable-next-line:no-any
  )(WrappedComponent as any);
};

export default WithFeedManager;
