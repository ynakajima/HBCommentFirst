// screens/BookmarkCommentListScreen.js
import React from 'react'
import CommentList from '../components/CommentList'
import BookmarkCommentListScreenHeader from '../components/BookmarkCommentListScreenHeader'
import { View } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { fetchBookmarkComments } from '../libs/HatenaBookmarkAPI'
import { fetchBookmarkCommentStars } from '../libs/HatenaStarAPI'
import PropTypes from 'prop-types'

export default class BookmarkCommentListScreen extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      title: '読み込み中...',
      count: 0,
      bookmarks: [],
      hotBookmarks: [],
      refreshingBookmarks: true,
      refreshingHotBookmarks: true,
      index: 0,
      routes: [
        { key: 'recent', title: '最新コメント' },
        { key: 'hot', title: '人気コメント' }
      ]
    }

    // bind
    this.fetchComments = this.fetchComments.bind(this)
    this._handleIndexChange = this._handleIndexChange.bind(this)
    this._renderScene = this._renderScene.bind(this)
  }

  componentDidMount () {
    this.fetchComments()
  }

  async fetchComments () {
    this.setState({
      refreshingBookmarks: true,
      refreshingHotBookmarks: true
    })

    // ブックマークコメントを取得
    let entry = await fetchBookmarkComments(this.props.url)
    let { title, count, bookmarks } = entry

    bookmarks = bookmarks
      .filter(bookmark => bookmark.comment !== '')

    this.setState({
      title,
      count,
      bookmarks,
      refreshingBookmarks: false
    })

    // 各コメントのスター情報を取得
    entry = await fetchBookmarkCommentStars(entry)
    bookmarks = entry.bookmarks
      .filter(bookmark => bookmark.comment !== '')
    this.setState({
      bookmarks,
      hotBookmarks: bookmarks
        .filter(bookmark => bookmark.starCount > 0)
        // スター数と投稿日時でソート
        .sort((a, b) => b.starCount - a.starCount || a.unixtime - b.unixtime),
      refreshingHotBookmarks: false
    })
  }

  _handleIndexChange (index) {
    this.setState({ index })
  }

  _renderHeader (props) {
    return (
      <TabBar
        {...props}
        style={{
          backgroundColor: '#fff'
        }}
        labelStyle={{
          color: '#000'
        }}
        indicatorStyle={{
          height: 4,
          backgroundColor: '#795548'
        }}
      />
    )
  }

  _renderScene ({ route }) {
    switch (route.key) {
      case 'recent':
        return (
          <CommentList
            comments={this.state.bookmarks}
            refreshing={this.state.refreshingBookmarks}
            onRefresh={this.fetchComments}
          />
        )
      case 'hot':
        return (
          <CommentList
            comments={this.state.hotBookmarks}
            refreshing={this.state.refreshingHotBookmarks}
            onRefresh={this.fetchComments}
          />
        )
      default:
        return null
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <BookmarkCommentListScreenHeader
          title={this.state.title}
          count={this.state.count}
          url={this.props.url}
        />
        <TabViewAnimated
          style={{flex: 1}}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
        />
      </View>
    )
  }
}

BookmarkCommentListScreen.propTypes = {
  url: PropTypes.string
}
