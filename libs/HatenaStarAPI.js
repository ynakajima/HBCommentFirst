import promiseLimit from 'promise-limit'

const connectionLimit = 5
const limit = promiseLimit(connectionLimit)
const entrypoint = 'http://s.hatena.com/entry.json'

/**
 * はてなスター一覧取得
 */
export const fetchStars = async (urlList) => {
  let requests = []
  const sliceRange = 100
  for (let i = 0, l = urlList.length; i < l; i += sliceRange) {
    requests.push(urlList.slice(i, i + sliceRange))
  }

  let results = await Promise.all(requests.map(request => {
    return limit(() => _fetchStars(request))
  }))
  results = results.reduce((prev, current) => [...prev, ...current])
  console.log({results})
  return results
}

const _fetchStars = async (urlList) => {
  const params = urlList
    .map(url => `uri=${encodeURIComponent(url)}`)
    .join('&')

  const url = `${entrypoint}?${params}`
  console.log(url)

  const response = await fetch(url)
  if (response.status !== 200) {
    console.warn(response)
    const { status, statusText } = response
    throw new Error(`status: ${status}, statustext: ${statusText}`)
  }

  // スターのエントリー情報を取得
  let { entries } = await response.json()

  // 重複分を除いたスター総数を算出
  entries = entries.map(entry => {
    const stars = entry.stars
    const users = {}
    stars.forEach(({ name, quote }) => {
      if (typeof users[name] === 'undefined') {
        users[name] = {
          count: 0,
          quote
        }
      }
      users[name].count += 1
    })
    const starCount = Object.keys(users).length
    let coloredStars = []
    if (typeof entry.colord_stars !== 'undefined') {
      coloredStars = entry.colord_stars
    }
    return { stars, coloredStars, starCount, uri: entry.uri }
  })
  return entries
}

/**
 * 渡されたブックマークエントリーにスター情報を付与して返却
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
