// components/CommentList.js

import React from 'react'
import { FlatList, RefreshControl, View, Text } from 'react-native'
import CommentListItem from './CommentListItem'
import PropTypes from 'prop-types'

export default class CommentList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: true,
      bookmarks: [],
      title: 'ブックマークコメント読み込み中...',
      count: 0
    }

    // bind
    this._onRefresh = this._onRefresh.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  componentDidMount () {
    // マウント後にエントリー情報を取得
    this._fetchBookmarkComments()
  }

  // ブックマークコメントを取得して state を更新
  async _fetchBookmarkComments () {
    // エントリー情報を取得
    const { count, title, bookmarks } = await this.props.fetchEntry(this.props.url)

    // state を更新
    this.setState({
      refreshing: false,
      bookmarks,
      title,
      count
    })
  }

  _onRefresh () {
    this.setState({ refreshing: true })
    this._fetchBookmarkComments()
  }

  _keyExtractor (item, index) {
    return item.user
  }

  _renderItem ({ item }) {
    return (
      <CommentListItem
        {...item}
      />
    )
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 10, backgroundColor: '#eee'}}>
          <Text
            style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            { this.state.title }
          </Text>
          <Text
            style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#c00'}}
          >
            { this.state.count ? `${this.state.count} users` : '' }
          </Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.bookmarks}
            extraData={this.state.bookmarks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          />
        </View>
      </View>
    )
  }
}

CommentList.propTypes = {
  url: PropTypes.string,
  fetchEntry: PropTypes.func.isRequired
}
