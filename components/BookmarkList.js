// components/BookmarkList.js

import React from 'react'
import { Text, View, FlatList } from 'react-native'
import BookmarkListItem from './BookmarkListItem'

export default class BookmarkList extends React.Component {
  state = {
    items: []
  }

  async componentDidMount () {
    const feed = await this.props.fetchEntry()
    const items = feed.item
    console.dir(items)
    this.setState({ items })
  }

  _keyExtractor = (item, index) => item.link

  _renderItem = ({ item }) => (
    <BookmarkListItem item={item} />
  )
  
  render () {
    return (
      <FlatList
        data={this.state.items}
        extraData={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}
