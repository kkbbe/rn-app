import { AppRegistry,YellowBox } from 'react-native';
import App from './app/component/App';
import index from './app/component/indexapp';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('bbb', () => index);
