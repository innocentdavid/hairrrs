  // Get Article from cache
    // useEffect(() => {
        // const cache = getAticleCacheByUrlSlug(articleUrlSlug)
        // console.log(cache);
        // if (articleUrlSlug in cache.data) {
        //     setArticle(cache.data[articleUrlSlug].article)
        //     console.log('from cache', article);
        // } else {
        //     // request article from firebase
        //     if (articleUrlSlug) {
        //         const articleRef = db.collection('articles').where('UrlSlug', '==', articleUrlSlug);
        //         articleRef.get()
        //             .then((querySnapshot) => {
        //                 if (!querySnapshot.empty) {
        //                     querySnapshot.forEach((doc) => {
        //                         setArticle(doc.data());
        //                         setArticleToCacheByUrlSlug(articleUrlSlug, doc.data())
        //                         console.log('from from firestore', article);
        //                         setArticleId(doc.id);
        //                     });
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log("Error getting document:", error);
        //             });
        //     }
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [articleUrlSlug])
  