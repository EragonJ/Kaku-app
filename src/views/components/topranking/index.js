'use strict';

import React, { Component, Text, View, ListView, Image } from 'react-native';
import TopRanking from '../../../modules/TopRanking';
import Styles from './styles';

class TopRankingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  }
  
  componentDidMount() {
    TopRanking.get().then((tracks) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tracks),
        loaded: true
      });
    });
  }

  renderLoadingView() {
    return (
      <View style={Styles.container}>
        <Text>
          Loading tracks...
        </Text>
      </View>
    );
  }

  renderTrack(track) {
    let trackName = track.title;
    let trackAuthor = track.artist;
    let trackThumbnail = track.covers.default;

    return (
      <View style={Styles.container}>
        <Image
          source={{uri: trackThumbnail}}
          style={Styles.thumbnail}
        />
        <View style={Styles.rightContainer}>
          <Text style={Styles.trackName}>{trackName}</Text>
          <Text style={Styles.trackAuthor}>{trackAuthor}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTrack}
        style={Styles.listView}>
      </ListView>
    );
  }
}

module.exports = TopRankingComponent;
