import * as React from 'react';
import TabViewContext, { ContextValue, contextFactory } from './TabViewContext';

interface Props {
  children: React.ReactNode;
}

class TabView extends React.Component<Props> {
  private tabViewProps: ContextValue;

  public constructor(props: Props) {
    super(props);
    this.tabViewProps = contextFactory();
  }

  public render() {
    return (
      <TabViewContext.Provider value={this.tabViewProps}>
        {this.props.children}
      </TabViewContext.Provider>
    );
  }
}
export default TabView;
