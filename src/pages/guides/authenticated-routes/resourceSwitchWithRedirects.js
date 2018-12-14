import * as Navi from 'navi'
import { fetchResource } from './helpers'

export default Navi.createSwitch({
  paths: {
    '/:id': async env => {
      if (!env.context.currentUser) {
        return Navi.createRedirect(
          "/login/?redirectTo="+
          encodeURIComponent(env.pathname+env.search)
        )
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