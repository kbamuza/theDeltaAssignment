import { Navigation } from "react-native-navigation";
import DetailsScreen from './Shop/DetailsScreen';
import AllDealsScreen from './Shop/AllDealsScreen';
import AllStoresScreen from './Shop/AllStoresScreen';
import {Provider} from 'react-redux'
import { applicationStateStore } from '../Redux/Store/ApplicationStateStore';
import React from "react";
import { App } from '../../app';
import Loading from './Loading';

export function registerScreens() {
  Navigation.registerComponentWithRedux('Loading', () => Loading, Provider, applicationStateStore)
  Navigation.registerComponentWithRedux('App', () => App, Provider, applicationStateStore)
  Navigation.registerComponentWithRedux('AllDealsScreen', () => AllDealsScreen, Provider, applicationStateStore)
  Navigation.registerComponentWithRedux('AllStoresScreen', () => AllStoresScreen, Provider, applicationStateStore)
  Navigation.registerComponentWithRedux('DetailsScreen', () => DetailsScreen, Provider, applicationStateStore)
}

export const goToAllDeals = () => {
  Navigation.setRoot({
    root: {
      component: {
          name: "AllDealsScreen",
      },
    }
  })
}

export const goToAllStores = () => {
  Navigation.setRoot({
    root: {
      component: {
          name: "AllStoresScreen",
      },
    }
  })
}
