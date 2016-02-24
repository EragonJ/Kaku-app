'use strict';

import React, {
	Component,
	Text,
  TouchableOpacity,
  View
} from 'react-native';

import Video from 'react-native-video';
import Styles from './styles';
import Player from '../../../modules/Player';

class PlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);

    const SAMPLES = [
      'http://techslides.com/demos/sample-videos/small.mp4',
      'http://download.wavetlan.com/SVV/Media/HTTP/H264/Talkinghead_Media/H264_test1_Talkinghead_mp4_480x360.mp4'
    ];

    Player.on('play', (track) => {
      // TESTING
      track.platformTrackRealUrl = SAMPLES[Math.floor(Math.random() * 100) % SAMPLES.length];

      this.setState({
        playingTrack: track
      });
    });
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
    skin: 'native',
    playingTrack: null
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
    }
    else {
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
    );
  }

  render() {
    const videoStyle = Styles.fullScreen;

    let playingTrack = this.state.playingTrack;
    let uri = playingTrack && playingTrack.platformTrackRealUrl || 'blank';

    return (
      <View style={Styles.container}>
        <View style={Styles.fullScreen}>
          <Video source={{uri: uri}}
						 style={videoStyle}
						 rate={this.state.rate}
						 paused={this.state.paused}
						 volume={this.state.volume}
						 muted={this.state.muted}
						 resizeMode={this.state.resizeMode}
						 onLoad={this.onLoad}
						 onProgress={this.onProgress}
						 onEnd={() => {
               // TODO
             }}
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
}

module.exports = PlayerComponent;
