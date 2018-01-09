// App.js

import React from 'react'
import CommentList from './components/CommentList'
import { Platform, StyleSheet, View } from 'react-native'
import { fetchEntryWithStar } from './libs/HatenaBookmarkAPI'

export default class App extends React.Component {
  render () {
    const url = [
      'https://anond.hatelabo.jp/20180109111231', // 600 over
      'http://tomoyukiarasuna.com/make-images/' // 5700 over
    ]

    return (
      <View style={styles.app}>
        <CommentList
          fetchEntry={fetchEntryWithStar}
          url={url[0]}
        />
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
