// index.js
import { Navigation } from "react-native-navigation";

import Loading from './src/Screens/Loading';

Navigation.registerComponent("LoadingScreen", () => Loading);

Navigation.events().registerAppLaunchedListener(() => {
  // set the root component
  Navigation.setRoot({
    root: {
      component: {
        name: "LoadingScreen",
      },
    },
  });
});