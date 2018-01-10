// screens/BookmarkCommentListScreen.js

import React from 'react'
import CommentList from '../components/CommentList'
import { Platform, ToastAndroid } from 'react-native'
import { fetchEntryWithStar } from '../libs/HatenaBookmarkAPI'
import PropTypes from 'prop-types'

// ブックマークコメントを取得
const fetchBookmarkComments = async (url) => {
  const startTime = new Date().getTime() / 1000
  try {
    // エントリー情報を取得
    const entry = await fetchEntryWithStar(url)

    // 取得にかかった時間を表示
    const endTime = new Date().getTime() / 1000
    const performance = `Finish: ${endTime - startTime} sec`
    console.warn(performance)
    if (Platform.OS === 'android') {
      ToastAndroid.show(performance, ToastAndroid.SHORT)
    }

    return entry
  } catch (e) {
    console.warn(e)
    if (Platform.OS === 'android') {
      ToastAndroid.show(e.message, ToastAndroid.SHORT)
    }
  }
}

export default class BookmarkCommentListScreen extends React.Component {
  render () {
    const url = this.props.url
    return (
      <CommentList
        fetchEntry={fetchBookmarkComments}
        url={url}
      />
    )
  }
}

BookmarkCommentListScreen.propTypes = {
  url: PropTypes.string
}
