import { mount, route, lazy } from 'navi'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router, View } from 'react-navi'
import api from './api'
import Landing from './Landing'
import Layout from './Layout'

const routes =
  mount({
    '/': route({
      title: "Hats 'n' Flamethrowers 'r' Us",
      getData: () => api.fetchProducts(),
      view: <Landing />,
    }),
    '/product': lazy(() => import('./product')),
  })

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