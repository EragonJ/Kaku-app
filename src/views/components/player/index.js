'use strict';

import React, {
	Component,
	AlertIOS,
	Text,
  TouchableOpacity,
  View
} from 'react-native';

import Video from 'react-native-video';
import Styles from './styles';

class Player extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: true,
    paused: true,
    skin: 'native'
  };
  
  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[Styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  renderNativeSkin() {
    const videoStyle = Styles.fullScreen;
    return (
      <View style={Styles.container}>
        <View style={Styles.fullScreen}>
          <Video source={{uri: "http://techslides.com/demos/sample-videos/small.mp4"}}
						 style={videoStyle}
						 rate={this.state.rate}
						 paused={this.state.paused}
						 volume={this.state.volume}
						 muted={this.state.muted}
						 resizeMode={this.state.resizeMode}
						 onLoad={this.onLoad}
						 onProgress={this.onProgress}
						 onEnd={() => { AlertIOS.alert('Done!') }}
						 repeat={true}
						 controls={this.state.controls} />
        </View>
        <View style={Styles.controls}>
          <View style={Styles.generalControls}>
            <View style={Styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return this.renderNativeSkin();
  }
}

module.exports = Player;
