// index.js
import { Navigation } from "react-native-navigation";
import Loading from './src/Screens/Loading';
import { registerScreens } from './src/Screens/navigation';

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
  // set the root component
  Navigation.setRoot({
    root: {
      component: {
        name: "Loading",
      },
    },
  });
});