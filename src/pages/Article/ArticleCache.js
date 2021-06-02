// const ARTICLE_CACHE="ARTICLE_CACHE"
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14

const currentTime=()=>{
    return Date.now()
}

const getAticleCacheByUrlSlug=(articleUrlSlug)=>{

    let articleCache={
        data:{},
        nextCleanup:new Date().getTime()+TWO_WEEKS
    }  

    try {
        const data=localStorage.getItem(articleUrlSlug)

        if(data){
            articleCache=JSON.parse(data)
        }
    }
    catch(e){
        console.error(e.message)
    }

    return articleCache
}

const setArticleToCacheByUrlSlug=(articleUrlSlug, article)=>{

    const articleCache=getAticleCacheByUrlSlug(articleUrlSlug)
    const data=articleCache?.data


    const item={
        id:articleUrlSlug,
        expiry:new Date().getTime()+TWO_WEEKS,
        article
    }

    data[articleUrlSlug]=item

    try{
        localStorage.setItem(articleUrlSlug, JSON.stringify(articleCache))
    }
    catch(e){
        cleanUpStorage(data, articleUrlSlug)
    }

}

const cleanUpStorage=(data, articleUrlSlug)=>{

    let isDeleted
    let oldest
    let oldestKey


    //if 14 days have been passed, it removes the cache
    for (const key in data) {
        const expiry = data[key].expiry
        if (expiry && expiry <=currentTime()) {
          delete data[key]
          isDeleted = true
        }
    
        //finding the oldest cache in case none of them are expired
        if (!oldest || oldest > expiry) {
          oldest = expiry
          oldestKey=key
        }
    }

    //remove the oldest cache if there is no more space in local storage (5 MB)
    if(!isDeleted && oldestKey){
        delete data[oldestKey]
    }

    localStorage.setItem(
        articleUrlSlug,
        JSON.stringify({
          data: data,
          nextCleanup:currentTime() + TWO_WEEKS,
        })
    )

}

export {setArticleToCacheByUrlSlug, getAticleCacheByUrlSlug}