import register from 'navi-scripts/register'
import { createBrowserNavigation } from 'navi'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-navi'
import routes from './routes'
import { App } from './App'
import './index.scss'

register({
  // Specify the pages that navi-app should statically build, by passing
  // in a Switch object
  routes,

  // The `exports` object is made available to the `renderPageToString`
  // function.
  exports: {
    App
  },

  async main() {
    let navigation = createBrowserNavigation({
      routes,
      context: {
        getDocumentComponents: () => {},
      }
    })

    // Wait until the navigation has loaded the page's content,
    // or failed to do so. If you want to load other data in parallel
    // while the initial page is loading, do it before this line.
    await navigation.getRoute()

    // React requires that you call `ReactDOM.hydrate` if there is
    // statically rendered content in the root element, but prefers
    // us to call `ReactDOM.render` when it is empty.
    let hasStaticContent = process.env.NODE_ENV === 'production'
    let renderer = hasStaticContent ? ReactDOM.hydrate : ReactDOM.render

    // Start react.
    renderer(
      <Router navigation={navigation}>
        <App />
      </Router>,
      document.getElementById('root')
    )
  }
})
