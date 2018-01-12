// components/CommentList.js

import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import CommentListItem from './CommentListItem'
import PropTypes from 'prop-types'

export default class CommentList extends React.PureComponent {
  constructor (props) {
    super(props)

    // bind
    this._onRefresh = this._onRefresh.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  _onRefresh () {
    this.setState({ refreshing: true })
    this.props.onRefresh()
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
      <FlatList
        data={this.props.comments}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      />
    )
  }
}

CommentList.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired
}
