import * as Navi from 'navi'
import React from 'react'
import Layout from './Layout'

export default Navi.createSwitch({
  // You can set content for switches as well as pages
  getContent: env =>
    <Layout pathname={env.mountname || '/'} />,

  paths: {
    '/': Navi.createPage({
      title: "Home",
      getContent: env => import('./home.md'),
    }),
    '/about': Navi.createPage({
      title: 'About',
      getContent: env => import('./about.md'),
    }),
  },
})