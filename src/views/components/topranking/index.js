'use strict';

import React, {
  Component, Text, View, ListView, Image, TouchableHighlight
} from 'react-native';
import TopRanking from '../../../modules/TopRanking';
import Styles from './styles';

class TopRankingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
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

  renderTrack(track, sectionId, rowId) {
    let trackName = track.title;
    let trackAuthor = track.artist;
    let trackThumbnail = track.covers.default;

    return (
      <TouchableHighlight onPress={() => {this.onItemPress(track)}}>
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
      </TouchableHighlight>
    );
  }

  onItemPress(track) {
    console.log(track);
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    let renderTrack = this.renderTrack.bind(this);

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={renderTrack}
        style={Styles.listView}>
      </ListView>
    );
  }
}

module.exports = TopRankingComponent;
