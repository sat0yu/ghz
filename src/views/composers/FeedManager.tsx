import * as React from 'react';
import { connect, Omit } from 'react-redux';
import { queryBrowserSelectors } from '../../state/queryBrowser';
import { RootState } from '../../state/store';

export type InjectedFeedManagerProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (store: RootState) => ({
  feedByQuery: queryBrowserSelectors.getFeedByQuery(store),
});

const WithFeedManager = <P extends InjectedFeedManagerProps>(
  Component: React.ComponentType<P>,
) => {
  type OriginalProps = Omit<P, keyof InjectedFeedManagerProps>;
  const mergeProps = (
    stateProps: InjectedFeedManagerProps,
    _dispatchProps: undefined,
    ownProps: OriginalProps,
  ) => ({
    ...stateProps,
    ...ownProps,
  });

  class WrappedComponent extends React.Component {
    public render() {
      return <Component {...this.props as P} />;
    }
  }

  return connect(
    mapStateToProps,
    undefined,
    mergeProps,
  )(WrappedComponent);
};

export default WithFeedManager;
