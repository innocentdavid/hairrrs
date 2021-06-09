import React from 'react'

function StorePageVisited({ pageUrl }) {
    localStorage.setItem("pageUrl", JSON.stringify(pageUrl));
    
    var storedpages = JSON.parse(localStorage.getItem("pageUrl"));
    console.log(storedpages && storedpages)

    return (
        <div>

        </div>
    )
}

export default StorePageVisited
