import BusyIndicator from 'react-busy-indicator@1.0.0'
import React from 'react'
import { Link, useLoadingRoute } from 'react-navi'

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
        <Link href='/'>
          Hats 'n' Flamethrowers 'r' Us
        </Link>
        </h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
