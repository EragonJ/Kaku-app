function BaseTrack(options) {
  options = options || {};

  var placeholderImagePath = './src/public/images/track-placeholder.png';

  this._trackUrlPrefix = '';
  this.id = options.id || Math.random();
  this.trackType = 'BaseTrack';
  this.title = options.title || 'Unknown Title';
  this.artist = options.artist || 'Unknown Artist';
  this.description = options.description || 'Unknown Description';
  this.platformId = options.platformId || '';
  this.ext = options.ext || '';

  // NOTE
  // We can't store the real url here because some online streaming platform
  // will use generated url for current session and when we are trying to
  // access next time, the realUrl will be invalid.
  //
  // Maybe in the future, we can make offline access feature to fix this.
  //
  // this.platformTrackRealUrl = options.platformTrackRealUrl || '';
  this.platformTrackRealUrl = '';
  this.covers = options.covers || {
    default: placeholderImagePath,
    medium: placeholderImagePath,
    large: placeholderImagePath
  };
}

// static method
BaseTrack.fromJSON = function(json) {
  var trackType = json.trackType || 'BaseTrack';
  var supportedTracks = {
    'BaseTrack': BaseTrack,
    'YoutubeTrack': require('./YoutubeTrack'),
    'SoundCloudTrack': require('./SoundCloudTrack'),
    'VimeoTrack': require('./VimeoTrack')
  };

  var trackConstructor = supportedTracks[trackType];
  return new trackConstructor(json);
};

BaseTrack.prototype = {
  get platformTrackUrl() {
    return this._trackUrlPrefix + this.platformId;
  },

  isSameTrackWith: function(otherTrack) {
    return this._isSamePlatformUrlWith(otherTrack) ||
      this._isSameTitleAndArtistWith(otherTrack);
  },

  _isSameTitleAndArtistWith: function(otherTrack) {
    return this.artist === otherTrack.artist &&
      this.title === otherTrack.title;
  },

  _isSamePlatformUrlWith: function(otherTrack) {
    return this.platformTrackUrl === otherTrack.platformTrackUrl;
  },

  toJSON: function() {
    return {
      id: this.id,
      ext: this.ext,
      trackType: this.trackType,
      title: this.title,
      artist: this.artist,
      description: this.description,
      platformId: this.platformId,
      platformTrackRealUrl: this.platformTrackRealUrl,
      covers: this.covers
    };
  }
};

module.exports = BaseTrack;
