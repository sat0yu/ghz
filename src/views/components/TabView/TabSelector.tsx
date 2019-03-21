import * as React from 'react';
import TabViewContext from './TabViewContext';

interface Props {
  tabId: string;
  children: React.ReactNode;
}

const TabSelector: React.FC<Props> = ({ tabId, children }) => (
  <TabViewContext.Consumer>
    {({ manager }) => (
      <div data-tab-id={tabId} onClick={() => manager.select(tabId)}>
        {children}
      </div>
    )}
  </TabViewContext.Consumer>
);
export default TabSelector;
