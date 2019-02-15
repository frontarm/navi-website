import React, { Component } from 'react';
import { Link, NavLoading, NaviProvider, View, NotFoundBoundary } from 'react-navi';
import { MDXProvider } from '@mdx-js/tag';

class App extends Component {
  render() {
    return (
      <NaviProvider navigation={this.props.navigation}>
        <NavLoading>
          {loadingRoute =>
            <div className="App">
              <header className="App-header">
                <nav className="App-nav">
                  <Link href='/' activeClassName='active' exact>
                    Home
                  </Link>
                  <Link href='/getting-started/' activeClassName='active'>
                    Getting Started
                  </Link>
                </nav>
              </header>

              <main>
                <NotFoundBoundary render={renderNotFound}>
                  <div
                    // Only add the `active` class to this element while the
                    // next page is loading, triggering a CSS animation to
                    // show or hide the loading bar.
                    className={`
                      App-loading-indicator
                      ${loadingRoute ? 'active' : ''}
                    `}
                  />
                  <MDXProvider components={{
                    // Use Navi's <Link> component to render links in
                    // Markdown files, ensuring navigation is handled by Navi.
                    a: Link,
                  }}>
                    <View />
                  </MDXProvider>
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