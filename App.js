import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/pages/LoginScreen';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;