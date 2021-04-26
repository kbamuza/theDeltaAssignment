import { Navigation } from "react-native-navigation";
import DetailsScreen from './Shop/DetailsScreen';
import AllDealsScreen from './Shop/AllDealsScreen';
import AllStoresScreen from './Shop/AllStoresScreen';

Navigation.registerComponent("AllDealsScreen", () => AllDealsScreen);
Navigation.registerComponent("AllStoresScreen", () => AllStoresScreen);
Navigation.registerComponent("DetailsScreen", () => DetailsScreen);

export const goToAllDeals = () => {
  Navigation.setRoot({
    root: {
      stack: {
        // create a stack navigation
        children: [
          {
            component: {
              name: "AllDealsScreen",
            },
          },
        ],
      },
    },
  })
}

export const goToTabs = (icons, username) => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: "bottomTabsMain",
        children: [
          {
            component: {
              name: "AllDealsScreen",
              options: {
                bottomTab: {
                  fontSize: 11,
                  text: "Games",
                },
              },
            },
          },
          {
            component: {
              name: "AllStoresScreen",
              options: {
                bottomTab: {
                  fontSize: 11,
                  text: "Stores",
                },
              },
            },
          },
          {
            component: {
              name: "DetailsScreen",
              options: {
                bottomTab: {
                  fontSize: 11,
                  text: "Deals",
                },
              },
            },
          },
        ],
      },
    },
  });
};