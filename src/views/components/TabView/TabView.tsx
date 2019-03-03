import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const TabView: React.FC<Props> = ({ children }) => <>{children}</>;
export default TabView;
