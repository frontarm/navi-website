import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Router, View } from 'react-navi'
import routes from './routes'
import { authService } from './helpers'

function App() {
  // Use state to store the current user
  let [currentUser, setCurrentUser] =
    useState(() => authService.getCurrentUser())

  // Subscribe that state to the value emitted by the auth service
  useEffect(() => authService.subscribe(setCurrentUser), [])

  return (
    // Pass currentUser to router, so it knows whether to redirect
    // the current user to login page for authenticated routes
    <Router routes={routes} context={{ authService, currentUser }}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
