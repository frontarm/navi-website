import { compose, lazy, map, mount, redirect, route, withView } from 'navi'
import React from 'react'
import { View } from 'react-navi'
import { Layout } from './helpers'

export default compose(
  withView((request, context) =>
    <Layout
      currentUser={context.currentUser}
      onLogout={() => context.authService.logout()}
    >
      <View />
    </Layout>
  ),
  mount({
    '/login': map(async (request, context) =>
      context.currentUser ? redirect(
        // Redirect to the value of the URL's `redirectTo` parameter. If no
        // redirectTo is specified, default to `/resource/favorite-foods/`.
        request.params.redirectTo
          ? decodeURIComponent(request.params.redirectTo)
          : '/resource/favorite-foods/'
      ) : route({
        title: 'Login',
        getView: async (req, context) => {
          const { Login } = await import('./helpers')
          return <Login authService={context.authService} />
        },
      })
    ),
    
    '/resource': lazy(() => import('./resourceRoutes')),
    
    '/': redirect('/login'),
  })
)