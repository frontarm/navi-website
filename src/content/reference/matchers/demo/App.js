import * as React from 'react'
import { Link, NaviProvider, View, NavLoading, NotFoundBoundary } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'

class App extends React.Component {
  render() {
    return (
      <NaviProvider navigation={this.props.navigation}>
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
                <NotFoundBoundary render={renderNotFound}>
                  <View />
                </NotFoundBoundary>
              </main>
            </div>
          }
        </NavLoading>
      </NaviProvider>
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