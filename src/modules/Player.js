'use strict';

import EventEmitter from 'events';

class Player extends EventEmitter {
  play(track) {
    this.emit('play', track);
  }

  pause() {
    this.emit('pause');
  }
}

module.exports = new Player();
