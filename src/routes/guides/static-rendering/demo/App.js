import * as React from 'react'
import { Link, NotFoundBoundary, useLoadingRoute } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'

function App({ children }) {
  // The '!!' forces the value to a boolean
  let hasLoadingRoute = !!useLoadingRoute()

  return (
    <div className="App">
      <header className="App-header">
        <BusyIndicator
          color="#1ee79e"
          delayMs={333}
          isBusy={!!hasLoadingRoute}
        />
        <h1 className="App-title">
          <Link href='/'>
            <img src="https://frontarm.com/navi-logo.png" />
            <span>Navi</span>
          </Link>
        </h1>
      </header>
      <main>
        <NotFoundBoundary render={renderNotFound}>
          {children || null}
        </NotFoundBoundary>
      </main>
    </div>
  )
}

function renderNotFound() {
  return (
    <div className='App-error'>
      <h1>404 - Not Found</h1>
    </div>
  )
} 

export default App;