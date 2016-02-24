'use strict';

import React, { View, Text, Component } from 'react-native';
import TopRankingComponent from './views/components/topranking';
import PlayerComponent from './views/components/player';
import Styles from './styles';

import { TabBarIOS } from 'react-native-icons';
const TabBarItemIOS = TabBarIOS.Item;

class KakuApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <PlayerComponent/>
        <TabBarIOS
          translucent={true}
          selectedTab={this.state.selectedTab}
          tintColor="white"
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
            <TopRankingComponent/>
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
            <View style={Styles.container}>
              <Text>Settings</Text>
            </View>
          </TabBarItemIOS>
        </TabBarIOS>
      </View>
    );
  }
}

module.exports = KakuApp;
