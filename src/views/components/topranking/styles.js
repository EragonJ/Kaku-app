'use strict';

import { StyleSheet } from 'react-native';

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


module.exports = styles;
