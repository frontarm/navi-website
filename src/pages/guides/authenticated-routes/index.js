import * as Navi from 'navi'
import React from 'react'
import ReactDOM from 'react-dom'
import pages from './pages'
import { App, authService } from './helpers'

async function main() {
  let navigation = Navi.createBrowserNavigation({
    pages,
    context: {
      // Make the initial value of `env.currentUser` available to
      // route declaration functions.
      currentUser: authService.getCurrentUser(),
    },
  })
  
  // Subscribe to new authentication state, and use it to set the
  // navigation context and thus recompute the routing state.
  authService.subscribe(() => {
    navigation.setContext({
      currentUser: authService.getCurrentUser()
    })
  })

  await navigation.steady()

  // Start react.
  ReactDOM.render(
    <App navigation={navigation} />,
    document.getElementById('root')
  )
}

main()
