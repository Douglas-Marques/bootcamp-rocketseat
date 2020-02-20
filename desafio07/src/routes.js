import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Cart from './pages/Cart';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#141419',
        },
        headerTintColor: '#fff',
        headerTitle: 'ROCKETSHOES',
        headerTitleStyle: {
          fontFamily: 'Roboto',
        },
      },
    }
  )
);

export default Routes;
