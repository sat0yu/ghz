import * as React from 'react';
import { withTabViewContext, ContextValue } from './TabViewContext';

interface OwnProps {
  tabId: string;
  children: React.ReactNode;
}

type Props = OwnProps & ContextValue;

class TabContent extends React.Component<Props> {
  private update() {
    this.forceUpdate();
  }

  public constructor(props: Props) {
    super(props);
    this.update = this.update.bind(this);
  }

  public componentDidMount() {
    const { manager, tabId } = this.props;
    manager.subscribe(tabId, this.update);
  }

  public componentWillUnmount() {
    const { manager, tabId } = this.props;
    manager.unsubscribe(tabId);
  }

  public render() {
    const { tabId, children, manager } = this.props;
    return manager.isCurrent(tabId) ? (
      <div data-tab-id={tabId}>{children}</div>
    ) : null;
  }
}

export default withTabViewContext(TabContent);
