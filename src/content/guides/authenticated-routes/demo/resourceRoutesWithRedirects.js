import { map, mount, redirect, route } from 'navi'
import { fetchResource } from './helpers'

export default mount({
  '/:id': map(async (request, context) => {
    if (!context.currentUser) {
      return redirect(
        "/login/?redirectTo="+
        encodeURIComponent(request.mountpath+request.search)
      )
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