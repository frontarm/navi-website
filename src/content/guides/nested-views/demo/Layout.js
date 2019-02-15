import React from 'react'
import { NavContent, Link, NavNotFoundBoundary } from 'react-navi'

export default function Layout(props) {
  return (
    <div className='Layout'>
      <nav>
        <Link href={props.pathname}>
          <img src="https://frontarm.com/navi-logo.png" />
          <span>Home</span>
        </Link>
        <Link href={props.pathname+"about"}>About</Link>
        <Link href="/not-found-404">404</Link>
      </nav>
      <main>
        {/* <NavContent> will render content for whatever switches are found,
            even if child switches are *not* found. This allows you to handle
            404s within a layout component. */}
        <NavNotFoundBoundary render={() => <NotFound />}>
          <NavContent />
        </NavNotFoundBoundary>
      </main>
    </div>
  )
}

function NotFound() {
  return (
    <div className='NotFound'>
      <h1>404 - Not Found</h1>
    </div>
  )
}
