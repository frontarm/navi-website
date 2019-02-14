import React from 'react'
import { Link } from 'react-navi'
import { map, route } from 'navi'

export default map({
  // Map "/" to the given document title and child view.
  '/': route({
    title: "Navi",
    view:
      <div>
        <h1>My Awesome Site</h1>
        <nav>
          <Link href='/about'>
            About &raquo;
          </Link>
        </nav>
      </div>
  }),

  // Lazily import the child view for "/about" whene needed.
  '/about': route({
    title: "About",
    getView: () => import('./routes/About')
  }),
})