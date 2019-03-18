import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Link, NotFoundBoundary, Router, View, useLoadingRoute } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'
import routes from './routes'

function Layout({ children }) {
  let loadingRoute = useLoadingRoute()

  return (
    <div className="App">
      <BusyIndicator
        color="#1ee79e"
        delayMs={333}
        isBusy={!!loadingRoute}
      />
      <header className="App-header">
        <h1 className="App-title">
          <Link href='/'>
            <img src="https://frontarm.com/navi-logo.png" />
            <span>Navi</span>
          </Link>
        </h1>
      </header>
      <main>
        <NotFoundBoundary render={renderNotFound}>
          {children}
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

ReactDOM.render(
  <Router routes={routes}>
    <Layout>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Layout>
  </Router>,
  document.getElementById('root')
)