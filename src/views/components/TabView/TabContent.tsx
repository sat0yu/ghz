import * as React from 'react';
import { ContextValue, withTabViewContext } from './TabViewContext';

interface OwnProps {
  tabId: string;
  children: React.ReactNode;
}

type Props = OwnProps & ContextValue;

class TabContent extends React.Component<Props> {
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
  private update() {
    this.forceUpdate();
  }
}

export default withTabViewContext(TabContent);
