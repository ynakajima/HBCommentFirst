// App.js

import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import BookmarkCommentListScreen from './screens/BookmarkCommentListScreen'

export default class App extends React.Component {
  render () {
    const url = [
      'https://anond.hatelabo.jp/20180109111231', // 600 over
      'http://tomoyukiarasuna.com/make-images/' // 5700 over
    ]

    return (
      <View style={styles.app}>
        <BookmarkCommentListScreen url={url[1]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    marginTop: Platform.OS === 'ios' ? 20 : 24,
    flex: 1
  }
})
