import * as React from 'react';
import { connect, Omit } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  queryBrowserOperations,
  queryBrowserSelectors,
} from '../../state/queryBrowser';
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
      discardQuery: queryBrowserOperations.discardQuery,
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

  class WrappedComponent extends React.Component {
    public render() {
      return <Component {...this.props as P} />;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  )(WrappedComponent);
};

export default WithFeedManager;
