import X2JS from 'x2js'

const hotentry = 'http://b.hatena.ne.jp/hotentry.rss'

/**
 * ホットエントリーを読み込んでJSONを返す
 */
export const fetchHotEntry = () => {
  return fetchRss(hotentry)
}

/**
 * RSSをfetchしてJSONを返す
 */
const fetchRss = async (url) => {
  const response = await fetch(url)
  const rssText = await response.text()
  const x2js = new X2JS()
  const rss = x2js.xml2js(rssText)
  return rss.RDF
}
