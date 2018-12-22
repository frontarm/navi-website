import React, { Component } from 'react';
import { NavLink, NavLoading, NavProvider, NavContent, NavNotFoundBoundary } from 'react-navi';
import { MDXProvider } from '@mdx-js/tag';

class App extends Component {
  render() {
    return (
      <NavProvider navigation={this.props.navigation}>
        <NavLoading>
          {loadingRoute =>
            <div className="App">
              <header className="App-header">
                <nav className="App-nav">
                  <NavLink href='/' activeClassName='active' exact>
                    Home
                  </NavLink>
                  <NavLink href='/getting-started/' activeClassName='active'>
                    Getting Started
                  </NavLink>
                </nav>
              </header>

              <main>
                <NavNotFoundBoundary render={renderNotFound}>
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
                    // Use Navi's <NavLink> component to render links in
                    // Markdown files, ensuring navigation is handled by Navi.
                    a: NavLink,
                  }}>
                    <NavContent />
                  </MDXProvider>
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