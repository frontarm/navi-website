import * as Navi from 'navi'
import React from 'react'

export default Navi.createSwitch({
  paths: {
    '/login': async env =>
      env.context.currentUser ? (
        Navi.createRedirect(
          // Redirect to the value of the URL's `redirectTo` parameter.
          // If no redirectTo is specified, default to `/welcome/`
          env.params.redirectTo
            ? decodeURIComponent(env.params.redirectTo)
            : '/welcome/'
        )
      ) : (
        Navi.createPage({
          title: 'Login',
          getContent: async () => {
            const { Login } = await import('./helpers')
            return <Login />
          },
        })
      ),
    
    '/resource': () => import('./resourceSwitch'),
    
    '/': Navi.createRedirect('/login'),
  }
})
