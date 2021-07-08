// const ARTICLE_CACHE="ARTICLE_CACHE"
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14

const currentTime = () => {
  return Date.now()
}

const getCachedAticles = () => {

  let articleCache = {
    data: {},
    nextCleanup: new Date().getTime() + TWO_WEEKS
  }

  try {
    const data = localStorage.getItem('trendingArticles')

    if (data) {
      articleCache = JSON.parse(data)
    }
  }
  catch (e) {
    console.error(e.message)
  }

  return articleCache
}

const setCachedAticles = (articles) => {

  const articleCache = getCachedAticles('trendingArticles')
  const data = articleCache?.data


  const item = {
    id: 'trendingArticles',
    expiry: new Date().getTime() + TWO_WEEKS,
    articles
  }
  
  if (item) {
    data['trendingArticles'] = item
  }

  try {
    localStorage.setItem('trendingArticles', JSON.stringify(articleCache))
  }
  catch (e) {
    cleanUpStorage(data)
  }

}

const cleanUpStorage = (data) => {

  let isDeleted
  let oldest
  let oldestKey


  //if 14 days have been passed, it removes the cache
  for (const key in data) {
    const expiry = data[key].expiry
    if (expiry && expiry <= currentTime()) {
      delete data[key]
      isDeleted = true
    }

    //finding the oldest cache in case none of them are expired
    if (!oldest || oldest > expiry) {
      oldest = expiry
      oldestKey = key
    }
  }

  //remove the oldest cache if there is no more space in local storage (5 MB)
  if (!isDeleted && oldestKey) {
    delete data[oldestKey]
  }

  localStorage.setItem(
    'trendingArticles',
    JSON.stringify({
      data: data,
      nextCleanup: currentTime() + TWO_WEEKS,
    })
  )

}

export { setCachedAticles, getCachedAticles }