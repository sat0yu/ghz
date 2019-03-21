import * as React from 'react';
import { Omit } from 'react-redux';
import ContextManager from './ContextManager';

export interface ContextValue {
  manager: ContextManager;
}

export const contextFactory: () => ContextValue = () => ({
  manager: new ContextManager(),
});

const TabViewContext = React.createContext(contextFactory());

export const withTabViewContext = <P extends ContextValue>(
  Component: React.ComponentType<P>,
) =>
  class WrappedComponent extends React.Component<Omit<P, keyof ContextValue>> {
    public render() {
      return (
        <TabViewContext.Consumer>
          {value => {
            const props = { ...this.props, ...value } as P;
            return <Component {...props} />;
          }}
        </TabViewContext.Consumer>
      );
    }
  };

export default TabViewContext;
