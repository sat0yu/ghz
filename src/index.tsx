import registerServiceWorker from './registerServiceWorker';
import App from './views/App';
import { AppRegistry } from 'react-native';

import './index.css';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
registerServiceWorker();
