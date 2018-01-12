import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default class BookmarkCommentListScreenHeader extends React.PureComponent {
  render () {
    return (
      <View style={{padding: 10, backgroundColor: '#795548'}}>
        <Text
          style={{fontSize: 16, fontWeight: 'bold', textAlign: 'left', color: '#fff'}}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          { this.props.title }
        </Text>
        <View style={{marginTop: 5, flexDirection: 'row', opacity: 0.8}}>
          <Text
            style={{flex: 8, fontSize: 12, textAlign: 'left', color: '#fff'}}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            { this.props.url }
          </Text>
          <Text
            style={{flex: 2, fontSize: 12, fontWeight: 'bold', textAlign: 'right', color: '#fff'}}
          >
            { this.props.count ? `${this.props.count} users` : '' }
          </Text>
        </View>
      </View>
    )
  }
}

BookmarkCommentListScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
}
