// components/BookmarkListItem.js

import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

export default class CommentListItem extends React.PureComponent {
  render () {
    const { user, comment, timestamp, stars, tags } = this.props

    // ユーザープロフィール画像URL
    const profileImage = `https://cdn1.www.st-hatena.com/users/${user.substr(0, 2)}/${user}/profile.gif`
    const star = stars.length ? `★${stars.length}` : ''
    const tag = tags.length ? `[${tags.join(' ')}]` : ''

    return (
      <View style={styles.item}>
        <View style={styles.image}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        </View>
        <View style={styles.body}>
          <Text
            style={styles.comment}
          >
            <Text style={styles.user}>{ user }</Text>
            { ' ' }
            { comment }
            { ' ' }
            <Text style={styles.tags}>{ tag }</Text>
          </Text>
          <Text
            style={styles.timestamp}
          >
            { timestamp }
            { ' ' }
            <Text style={[styles.timestamp, styles.star]}>
              { star }
            </Text>
          </Text>
        </View>
      </View>
    )
  }
}

CommentListItem.propTypes = {
  user: PropTypes.string,
  timestamp: PropTypes.string,
  comment: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  stars: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    quote: PropTypes.string
  }))
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    width: 42
  },
  profileImage: {
    width: 32,
    height: 32
  },
  body: {
    flex: 1
  },
  comment: {
    marginTop: -5,
    fontSize: 14,
    lineHeight: 14 * 1.5
  },
  timestamp: {
    marginTop: 5,
    fontSize: 13,
    color: '#666'
  },
  user: {
    color: '#00a4de'
  },
  star: {
    color: '#F7AD30'
  },
  tags: {
    fontSize: 13,
    color: '#666'
  }
})
