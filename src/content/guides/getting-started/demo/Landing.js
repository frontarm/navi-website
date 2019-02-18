import React from 'react'
import { Link, useCurrentRoute } from 'react-navi'

export default function Landing() {
  // useCurrentRoute returns the lastest loaded Route object
  let { data } = useCurrentRoute()
  let productIds = Object.keys(data)
  
  return (
    <ul>
      {productIds.map(id => 
        <li key={id}>
          <Link href={`/product/${id}`}>{data[id].title}</Link>
        </li>
      )}
    </ul>
  )
}
