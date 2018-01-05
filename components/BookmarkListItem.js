// components/BookmarkListItem.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class BookmarkListItem extends React.Component {
  render () {
    const item = this.props.item
    return (
      <View style={styles.item}> 
        <Text
          style={styles.itemTitle}
          numberOfLines={3}
          ellipsizeMode={'tail'}
        >
          { item.title }
        </Text>
        <Text
          style={styles.itemDesc}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          { item.description }
        </Text>
        <Text style={styles.itemCount}>{ item.bookmarkcount.toString() } users</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  itemTitle: {
    fontSize: 14,
    lineHeight: 14 * 1.6,
    fontWeight: 'bold'
  },
  itemDesc: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 13 * 1.6,
    color: '#666'
  },
  itemCount: {
    marginTop: 8,
    fontSize: 13,
    color: '#c00'
  }
})