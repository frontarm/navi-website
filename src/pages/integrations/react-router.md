export const filename = __filename
import { Doc } from '@frontarm/doc'

Integrating with react-router
=============================

Navi works great with react-router. Internally, they both interact with `window.history` through the same [history](https://www.npmjs.com/package/history) package, ensuring consistency between both routers.

In order to use Navi with react-router, you'll need to create your `Navigation` object *inside* a react-router `<Route>`. You can do this by passing the `<Route>` a component that creates a `Navigation` object with the route's `history`, and a `basename` option that matches its parent route's URL. Then, just pass through the `navigation` object to a component that renders its content -- like with any other Navi project:

```js
//---
restricted: true
//--- App.js
import * as Navi from 'navi'
import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { SupportApp, supportPages } from './Support'
import Index from './Index'

// This route handler will receive a `history` and `match` object from
// react-router, which can be used to create a scoped Navigation object
// for Navi.
class SupportRouteHandler extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = Navi.createBrowserNavigation({
      pages: supportPages,

      // Navi will use this history object instead of creating its own
      // internal one.
      history: props.history,

      // The basename sets the "root path" that this Navigation will manage.
      basename: props.match.url,
    })
  }

  componentWillUnmount() {
    // When control returns to react-router, you'll want to clean up the
    // navigation object.
    delete this.navigation.dispose()
  }

  render() {
    return (
      <SupportApp 
        navigation={this.navigation}
        basename={this.props.match.url}
      />
    )
  }
}

// The SupportRouteHandler component can then be passed to any
// react-router `<Route>` as its `component` prop.
export default function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/support" component={SupportRouteHandler} />
      </Switch>
    </BrowserRouter>
  )
}
//--- Support.js
import * as Navi from 'navi'
import React from 'react'
import { NavLink, NavProvider, NavContent, NavLoading, NavNotFoundBoundary } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'

// This switch will be mounted under "/support" route
// that is managed by react-router.
export const supportPages = Navi.createSwitch({
  paths: {
    '/': Navi.createPage({
      title: "Support",
      content:
        <div>
          <p>
            This is a fake support component that 
            you can mount within your app.
          </p>
          <nav>
            <NavLink href='./new'>
              Open a support ticket
            </NavLink>
          </nav>
        </div>
    }),

    '/new': Navi.createPage({
      title: "New support ticket",
      content:
        <div>
          <h1>New Ticker</h1>
          <textarea />
        </div>
    }),
  }
})

export class SupportApp extends React.Component {
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
                  <NavLink href={this.props.basename}>
                    <span>Support</span>
                  </NavLink>
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
//--- Index.js
import React from 'react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="App">
      <main>
        <h1>My Great App</h1>
        <Link to="/support">Open support</Link>
      </main>
    </div>
  )
}    
//--- index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
//--- styles.css
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,900|Inconsolata:400,700');

* {
  box-sizing: border-box;
}

html {
  font-family: Lato, sans-serif;
  font-size: 8px;
}

body {
  margin: 0;
  font-size: 16px;
  line-height: 3rem;
}

.App main {
  margin: 2rem;
}
.App-header {
  border-bottom: 1px solid #eee;
}
.App-header h1 {
  margin: 1rem 1.5rem;
}
.App-header img {
  height: 32px;
  margin: 0 auto;
  line-height: 32px;
  vertical-align: -10px;
}
.App-header span {
  display: inline-block;
  color: #444444;
  font-family: Lato, sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  margin-left: 0.25rem;
}
```

<Doc.Beware
  title={<>Avoid using react-router <em>within</em> Navi content</>}
>

Because react-router handles navigation synchronously while Navi handles it asynchronously, you'll always want your Navi routes to be nested *within* the react-router routes -- never the other way around.

Unfortunately, this means that Navi's static generation tools will not work with an app that uses react-router -- but you'll still get async content, page title and scroll management, and all the rest of Navi's features!

</Doc.Beware>