import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserNavigation } from 'navi'
import pages from './pages'
import App from './App'

async function main() {
  let navigation = createBrowserNavigation({ pages })

  // Wait until async content is ready (or has failed).
  await navigation.steady()

  ReactDOM.render(
    <App navigation={navigation} />,
    document.getElementById('root')
  );
}

// Start the app
main()