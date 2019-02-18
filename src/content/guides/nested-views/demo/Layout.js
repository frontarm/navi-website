import React from 'react'
import { Link } from 'react-navi'

export default function Layout(props) {
  return (
    <div className="Layout">
      <nav>
        <Link
          href={props.mountpath}
          exact
          activeStyle={{ fontWeight: 'bold' }}>
          <img src="https://frontarm.com/navi-logo.png" />
          <span>Home</span>
        </Link>
        <Link
          href={props.mountpath + 'about'}
          activeStyle={{ fontWeight: 'bold' }}>
          About
        </Link>
      </nav>
      <main>{props.children || null}</main>
    </div>
  )
}
