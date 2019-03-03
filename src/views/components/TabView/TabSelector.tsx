import * as React from 'react';

interface Props {
  tabId: string;
  children: React.ReactNode;
}

const TabSelector: React.FC<Props> = ({ tabId, children }) => (
  <div data-tab-id={tabId}>{children}</div>
);
export default TabSelector;
