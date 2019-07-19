import React from 'react'
import { mount, redirect, route } from 'navi'

const routes = mount({
  '/': redirect('/hats'),
  '/hats': route({ view: <h1>Hats</h1> }),
  '/other': route({ view: <h1>Other</h1> }),
})

export default routes