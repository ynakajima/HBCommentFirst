import { fetchStars } from './HatenaStarAPI'
const entrypoint = 'http://b.hatena.ne.jp/entry/jsonlite/'

/**
 * ブックマークエントリー情報取得
 */
export const fetchBookmarkComments = async (url) => {
  const response = await fetch(`${entrypoint}?url=${encodeURI(url)}`)
  const entry = await response.json()

  // スター用の情報を初期化
  entry.bookmarks = entry.bookmarks
    .map(bookmark => {
      bookmark.stars = []
      bookmark.coloredStars = []
      bookmark.starCount = 0
      bookmark.unixtime = new Date(bookmark.timestamp).getTime() / 1000
      return bookmark
    })
  return entry
}

/**
 * スター情報付きブックマークエントリー情報取得
 */
export const fetchBookmarkCommentStars = async (entry) => {
  // はてなスターを取得
  let { eid, bookmarks } = entry
  const urlList = bookmarks
    .filter(({ comment }) => comment !== '')
    .map(({ user, timestamp }) => {
      // http://b.hatena.ne.jp/{ユーザーID}/{コメントの日付(YYYYMMDD)}#bookmark-{エントリーID}
      const yyyymmdd = timestamp.split(' ')[0].replace(/\//g, '')
      return `http://b.hatena.ne.jp/${user}/${yyyymmdd}#bookmark-${eid}`
    })
  let starEntries = []
  try {
    starEntries = await fetchStars(urlList)
  } catch (e) {
    console.warn(e)
  }

  // スター情報を付与
  const starIndex = {}
  starEntries.map((starEntry, index) => {
    const user = starEntry.uri.split('/')[3]
    starIndex[user] = index
  })
  bookmarks = bookmarks.map(bookmark => {
    if (typeof starIndex[bookmark.user] !== 'undefined') {
      const { stars, coloredStars, starCount } = starEntries[starIndex[bookmark.user]]
      return { ...bookmark, ...{ stars, coloredStars, starCount } }
    }
    return bookmark
  })

  // スター数でソート
  // bookmarks.sort((a, b) => b.starCount - a.starCount)

  entry.bookmarks = bookmarks
  console.log(entry)
  return entry
}
