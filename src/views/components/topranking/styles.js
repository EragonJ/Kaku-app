'use strict';

import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
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
    width: 120,
    height: 120,
    borderWidth: 5,
    borderRadius: 5,
    margin: 5
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

module.exports = Styles;
