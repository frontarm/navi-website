import { compose, mount, route, withView } from 'navi'
import React from 'react'
import { View } from 'react-navi'
import Layout from './Layout'

export default compose(
  withView(request =>
    // This is the first view -- it renders the second within a
    // `<Layout>` component.
    <Layout mountpath={request.mountpath || '/'}>
      <View />
    </Layout> 
  ),

  mount({
    '/': route({
      title: "Home",
      getView: () => import('./home.md'),
    }),
    '/about': route({
      title: 'About',
      getView: () => import('./about.md'),
    }),
  })
)