import React from 'react'
import { compose, crawl, mount, redirect, resolve, withData, withView, withContext } from 'navi'
import { fromPairs } from 'lodash'
import { join } from 'path'
import { Layout } from './components/Layout'
import content from './content'

function language(language) {
  let languageRoutes = compose(
    withData({
      language
    }),
    withView(async (req, context) => {
      if (req.method !== 'HEAD') {
        let { paths } = await crawl({
          routes: languageRoutes,
          basename: req.mountpath,
          root: req.mountpath,
        })
        let routes = await resolve({
          routes: languageRoutes,
          basename: req.mountpath,
          method: 'HEAD',
          root: req.mountpath,
          urls: paths,
        })
        let currentPath = join(req.mountpath, req.path, '/')
        let currentIndex = paths.indexOf(currentPath)
        let previousRoute, nextRoute

        if (currentIndex !== -1) {
          previousRoute = routes[currentIndex - 1]
          nextRoute = routes[currentIndex + 1]
        }

        return (
          <Layout
            isAuthenticated={context.isAuthenticated}
            isPro={context.isPro}
            repositoryRoot={context.repositoryRoot || ''}
            rootPathname={req.mountpath || '/'}
            routes={routes}
            nextRoute={nextRoute}
            previousRoute={previousRoute}
          />
        )
      }
    }),
    withContext((req, context) => ({
      language,
      languageRoot: req.mountpath,
      ...context,
    })),
    content
  )

  return languageRoutes
}

export default withContext(
  (req, context) => ({
    naviRoot: req.mountpath || '/',
    ...context,
  }),
  mount({
    '/': redirect('./en'),

    '/en': language('en'),
    '/ja': language('ja'),

    // Manual redirects for URLs added before i18n
    ...fromPairs([
      '/motivation',
      '/create-react-navi-app',
      ['/guides/minimal-example', '/guides/getting-started'],
      '/guides/static-rendering',
      '/guides/authenticated-routes',
      ['/guides/layouts-nested-content', '/guides/nested-views'],
      ['/integrations/react', '/reference/react-components-hooks'],
      '/integrations/react-helmet',
      '/integrations/react-router',
      '/reference/data-types',
      ['/reference/route-and-segment', '/reference/data-types'],
      ['/reference/url-descriptor', '/reference/data-types'],
      '/reference/history',
      '/reference/navigation',
      ['/reference/declarations', '/reference/matchers'],
      '/reference/router',
      '/deploy/now',
    ].map(paths => {
      if (!Array.isArray(paths)) {
        paths = [paths, paths]
      }
      return [
        paths[0],
        redirect((req, context) => join(context.naviRoot, 'en', paths[1]))
      ]
    }))
  })
)