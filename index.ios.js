'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

const REQUEST_URL = 'https://itunes.apple.com/tw/rss/topsongs/limit=100/json';

class KakuApp extends Component {
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
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.feed.entry),
          loaded: true
        });
      })
      .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading tracks...
        </Text>
      </View>
    );
  }

  renderTrack(trackInfo) {
    let trackName = trackInfo['im:name'].label || 'Unknown';
    let trackAuthor = trackInfo['im:artist'].label || 'Unknown';
    let trackThumbnail = trackInfo['im:image'].pop().label;

    return (
      <View style={styles.container}>
        <Image
          source={{uri: trackThumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.trackName}>{trackName}</Text>
          <Text style={styles.trackAuthor}>{trackAuthor}</Text>
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
        style={styles.listView}>
      </ListView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1
  },
  thumbnail: {
    width: 50,
    height: 50
  },
  trackName: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  trackAuthor: {
    textAlign: 'center'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#333'
  }
});

AppRegistry.registerComponent('KakuApp', () => KakuApp);
