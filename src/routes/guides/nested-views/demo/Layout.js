import React from 'react'
import { NavContent, NavLink, NavNotFoundBoundary } from 'react-navi'

export default function Layout(props) {
  return (
    <div className='Layout'>
      <nav>
        <NavLink href={props.pathname}>
          <img src="https://frontarm.com/navi-logo.png" />
          <span>Home</span>
        </NavLink>
        <NavLink href={props.pathname+"about"}>About</NavLink>
        <NavLink href="/not-found-404">404</NavLink>
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
