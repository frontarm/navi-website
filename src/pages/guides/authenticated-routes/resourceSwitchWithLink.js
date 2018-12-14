import * as Navi from 'navi'
import React from 'react'
import { LoginLink, fetchResource } from './helpers'

export default Navi.createSwitch({
  paths: {
    '/:id': async env => {
      // Render a link to the login screen if the user isn't currently 
      // logged in.
      if (!env.context.currentUser) {
        return Navi.createPage({
          title: 'Please Log In',
          content: <LoginLink redirectTo={env.pathname} />,
        })
      }

      // Pass in the currentUser object, which could contain a JSON
      // web token that is used for authentication.
      let resource = await fetchResource(
        env.params.id,
        env.context.currentUser
      )

      // Return a page with the resulting data.
      return Navi.createPage({
        title: resource.title,
        content: resource.content,
      })
    }
  }
})