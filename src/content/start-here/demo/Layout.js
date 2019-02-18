import BusyIndicator from 'react-busy-indicator@1.0.0'
import React from 'react'
import { Link, NotFoundBoundary, useLoadingRoute } from 'react-navi'

export default function Layout({ children }) {
  // If there is a route that hasn't finished loading, it can be
  // retrieved with `useLoadingRoute()`.
  let loadingRoute = useLoadingRoute()

  return (
    <div className="Layout">
      {/* This component shows a loading indicator after a delay */}
      <BusyIndicator isBusy={!!loadingRoute} delayMs={200} />
      <header className="Layout-header">
        <h1 className="Layout-title">
        <Link href='/' prefetch={null}>
          Hats 'n' Flamethrowers 'r' Us
        </Link>
        </h1>
      </header>
      <main>
        {/* Your `<View />` components handle 404s by throwing an
            error, which you can handle with NotFoundBoundary */}
        <NotFoundBoundary render={() => <NotFound />}>
          {children}
        </NotFoundBoundary>
      </main>
    </div>
  )
}

function NotFound() {
  return (
    <div className='Layout-error'>
      <h2>404 Not Found</h2>
      <p>Perhaps the page has gone for a long walk?</p>
    </div>
  )
}