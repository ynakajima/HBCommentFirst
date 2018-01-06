// components/BookmarkList.js

import React from 'react'
import { Text, View, FlatList, RefreshControl } from 'react-native'
import BookmarkListItem from './BookmarkListItem'

export default class BookmarkList extends React.Component {
  state = {
    refreshing: true,
    items: []
  }

  componentDidMount () {
    this._fetchFeed()
  }

  _fetchFeed = async () => {
    const feed = await this.props.fetchEntry()
    const items = feed.item
    console.dir(items)
    this.setState({
      refreshing: false,
      items
    })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this._fetchFeed()
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
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      />
    )
  }
}
