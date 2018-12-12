import { createPage, createSwitch } from 'navi'
import * as React from 'react'
import { NavLink } from 'react-navi'

export default createSwitch({
  paths: {
    '/': createPage({
      title: "Navi",
      content:
        <div>
          <h2>Navi</h2>
          <p>A router/loader for React</p>
          <nav><NavLink href='/reference'>API Reference</NavLink></nav>
        </div>
    }),

    '/reference': createPage({
      title: "API Reference",
      getContent: () => import('./pages/Reference')
    }),
  }
})