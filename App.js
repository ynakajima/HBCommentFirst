// App.js

import React from 'react'
import BookmarkList from './components/BookmarkList'
import { View } from 'react-native'
import { fetchHotEntry } from './libs/HatenaBookmark'

export default class App extends React.Component {
  render () {
    return (
      <View style={{marginTop: 20}}>
        <BookmarkList fetchEntry={fetchHotEntry} />
      </View>
    )
  }
}
