import { mount, route, lazy } from 'navi'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router, View } from 'react-navi'
import api from './api'
import Landing from './Landing'
import Layout from './Layout'

// Define routes using mount(), route(), and other simple functions.
const routes =
  mount({
    '/': route({
      title: "Hats 'n' Flamethrowers 'r' Us",
      getData: () => api.fetchProducts(),
      view: <Landing />,
    }),
    '/product': lazy(() => import('./product')),
  })

// Then pass your routes to a `<Router>`, and render them with `<View>`.
ReactDOM.render(
  <Router routes={routes}>
    <Layout>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Layout>
  </Router>,
  document.getElementById('root')
)