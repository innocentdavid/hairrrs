import React from 'react'
import { Link } from 'react-router-dom'

function Filter() {
  return (
    <div>
      <div className="filter">
            <div className="type-roof">category</div>
            <div className="select">
              <ul>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link> <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
              </ul>
            </div>
          </div>
          <div className="filter">
            <div className="type">Location <form><input type="text" defaultValue="Nigeria" className="country-filter" /></form></div>
            <div className="select">
              <ul>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link> <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
                <Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link><Link><li>cap</li></Link>
              </ul>
            </div>
          </div>
          <div className="filter1">
            <div className="type1">Price Range</div>
            <div className="filter--holder">
              <form><input type="text" placeholder="min" className="min-range" /></form>
              <form><input type="text" placeholder="max" className="max-range" /></form>
            </div>
          </div>
          <div className="filterBtn">Filter</div>
          
    </div>
  )
}

export default Filter
