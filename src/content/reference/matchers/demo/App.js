import * as React from 'react'
import { Link, NavProvider, NavContent, NavLoading, NavNotFoundBoundary } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'

class App extends React.Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <NavLoading>
          {isLoading =>
            <div className="App">
              <BusyIndicator
                color="#1ee79e"
                delayMs={333}
                isBusy={isLoading}
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
                <NavNotFoundBoundary render={renderNotFound}>
                  <NavContent />
                </NavNotFoundBoundary>
              </main>
            </div>
          }
        </NavLoading>
      </NavProvider>
    );
  }
}

function renderNotFound() {
  return (
    <div className='App-error'>
      <h1>404 - Not Found</h1>
    </div>
  )
} 

export default App;