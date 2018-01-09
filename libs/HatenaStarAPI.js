const entrypoint = 'http://s.hatena.com/entry.json'

/**
 * はてなスター一覧取得
 */
export const fetchStars = async (urlList) => {
  let concat = []
  const sliceRange = 100
  for (let i = 0, l = urlList.length; i < l; i += sliceRange) {
    let _urlList = urlList.slice(i, i + sliceRange)
    let entries = await _fetchStars(_urlList)
    if (entries.length > 0) {
      concat = [...concat, ...entries]
    }
  }
  console.log({concat})
  return concat
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
