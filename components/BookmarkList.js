// components/BookmarkList.js

import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import BookmarkListItem from './BookmarkListItem'
import PropTypes from 'prop-types'

export default class BookmarkList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: true,
      items: []
    }

    // bind
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount () {
    this._fetchFeed()
  }

  async _fetchFeed () {
    const feed = await this.props.fetchEntry()
    const items = feed.item
    console.log(items)
    this.setState({
      refreshing: false,
      items
    })
  }

  _onRefresh () {
    this.setState({ refreshing: true })
    this._fetchFeed()
  }

  _keyExtractor (item, index) {
    return item.link
  }

  _renderItem ({ item }) {
    return (
      <BookmarkListItem item={item} />
    )
  }

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
            onRefresh={this._onRefresh}
          />
        }
      />
    )
  }
}

BookmarkList.propTypes = {
  fetchEntry: PropTypes.func.isRequired
}
