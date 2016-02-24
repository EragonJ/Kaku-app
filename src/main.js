'use strict';

import Styles from './styles';
import TopRankingComponent from './views/components/topranking';
import React, { View, Text, Component } from 'react-native';
import { TabBarIOS } from 'react-native-icons';
const TabBarItemIOS = TabBarIOS.Item;

class KakuApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    };
  }

  _renderContent(word) {
    return (
      <View style={Styles.container}>
        <Text>{word}</Text>
      </View>
    );
  }

  _renderHome() {
    return (
      <View style={{flex: 1}}>
        <TopRankingComponent/>
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#c1d82f'}
        barTintColor={'#000000'}
        style={Styles.tabBar}>
        <TabBarItemIOS
          name="home"
          iconName={'ion|ios-home-outline'}
          selectedIconName={'ion|ios-home'}
          title={''}
          iconSize={32}
          accessibilityLabel="Home Tab"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          {this._renderHome()}
        </TabBarItemIOS>
        <TabBarItemIOS
            name="settings"
            iconName={'ion|ios-gear-outline'}
            selectedIconName={'ion|ios-gear'}
            title={''}
            iconSize={32}
            accessibilityLabel="Settings Tab"
            selected={this.state.selectedTab === 'settings'}
            onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          {this._renderContent('settings')}
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

module.exports = KakuApp;
