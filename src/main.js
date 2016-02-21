'use strict';

import React, { View, Component } from 'react-native';
import TopRankingComponent from './views/components/topranking';

class KakuApp extends Component {
  render() {
    return (
      <View>
        <TopRankingComponent/>
      </View>
    );
  }
}

module.exports = KakuApp;
