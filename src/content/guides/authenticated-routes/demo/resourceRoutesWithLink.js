import { map, mount, route } from 'navi'
import React from 'react'
import { LoginLink, fetchResource } from './helpers'

export default mount({
  '/:id': map(async (request, context) => {
    // Render a link to the login screen if the user isn't currently 
    // logged in.
    if (!context.currentUser) {
      return route({
        title: 'Please Log In',
        view: <LoginLink redirectTo={request.mountpath} />,
      })
    }

    // Pass in the currentUser object, which could contain a JSON
    // web token that is used for authentication.
    let resource = await fetchResource(
      request.params.id,
      context.currentUser
    )

    // Return a page with the resulting data.
    return route({
      title: resource.title,
      view: resource.content,
    })
  })
})