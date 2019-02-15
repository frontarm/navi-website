import React from 'react'
import { composeMatchers, map, redirect, route, withData, withView, withContext } from 'navi'
import { Layout } from './Layout'
import { join } from 'path'

export default composeMatchers(
  withView(async (req, context) => {
    let routeMap = await req.router.resolveRouteMap(req.mountpath)
    let paths = Object.keys(routeMap)
    let currentPath = join(req.mountpath, req.path, '/')
    let currentIndex = paths.indexOf(currentPath)
    let previousRoute, nextRoute

    if (currentIndex !== -1) {
      previousRoute = routeMap[paths[currentIndex - 1]]
      nextRoute = routeMap[paths[currentIndex + 1]]
    }

    return (
      <Layout
        isAuthenticated={context.isAuthenticated}
        isPro={context.isPro}
        repositoryRoot={context.repositoryRoot || ''}
        rootPathname={req.mountpath || '/'}
        routeMap={routeMap}
        nextRoute={nextRoute}
        previousRoute={previousRoute}
      />
    )
  }),
  withContext((req, context) => ({
    naviRoot: req.mountpath,
    ...context,
  })),
  map({
    '/': route({
      title: "Navi – A JavaScript router and static renderer",
      getView: (req, context) => getPageContent(req, context, import('./start-here/en.mdx')),
      data: {
        navTableOfContents: null,
        navTitle: 'Start Here',
        socialTitle: 'Navi',
        socialImageURL: require('./social-media-card.png'),
        metaDescription: 'Create big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app.',
      },
    }),

    '/motivation': route({
      title: 'The Motivation behind Navi',
      getView: (req, context) => getPageContent(req, context, import('./motivation/en.mdx')),
      data: {
        navTableOfContents: null,
        navTitle: 'Motivation',
        metaDescription: `Navi lets you create big, fast, CDN-delivered apps with great SEO & SMO — and all with vanilla create-react-app.`,
      }
    }),

    '/comparisons': route({
      title: "Comparison With Similar Tools",
      getView: (req, context) => getPageContent(req, context, import('./comparison/en.mdx')),
      data: {
        navTitle: 'Comparison With Similar Tools',
        socialTitle: 'Navi vs. Gatsby vs. Next.js',
        metaDescription: 'Navi is small routing library that gives you many of the benefits of larger frameworks.',
      },
    }),

    '/create-react-navi-app': route({
      title: 'Creating A New App',
      getView: (req, context) => getPageContent(req, context, import('./create-react-navi-app/en.mdx')),
      data: {
        metaDescription: 'Zero-configuration React apps with ready-to-go routing, MDX support, and static HTML generation.',
        socialImageURL: require('./create-react-navi-app/social.png'),
        socialTitle: 'Getting started with Navi',
      },
    }),

    '/guides': composeMatchers(
      withData({
        sectionTitle: 'Guides'
      }),
      map({
        '/minimal-example': redirect('./basic-components-hooks'),
        '/getting-started': route({
          title: 'Getting Started',
          getView: (req, context) => getPageContent(req, context, import('./guides/getting-started/en.mdx')),
          data: {
            metaDescription: 'Navi lets you use React’s Suspense, Hooks and Error Boundary APIs to handle routing declaratively, and asynchronously.',
          }
        }),

        '/url-parameters': route({
          title: 'URL Parameters',
          getView: (req, context) => getPageContent(req, context, import('./guides/url-parameters/en.mdx')),
          data: {
            metaDescription: 'URL parameters let you create routes that fetch data based on the URL, and pass it directly to the view.',
          }
        }),

        '/requests-routes-matchers': route({
          title: 'Requests, Routes and Matchers',
          getView: (req, context) => getPageContent(req, context, import('./guides/requests-routes-matchers/en.mdx')),
          data: {
            metaDescription: 'At its core, Navi is just a tool for mapping Requests to Routes; to accomplish this, it uses a pattern called Matchers.',
          }
        }),

        '/layouts-nested-content': redirect('/nested-views'),
        '/nested-views': route({
          title: 'Nested Routes and Views',
          getView: (req, context) => getPageContent(req, context, import('./guides/nested-views/en.mdx')),
          data: {
            metaDescription: `Learn to add nested views and layouts to your routes, allowing you to create entire apps that can be embedded anywhere.`
          }
        }),

        '/programmatic-navigation': route({
          title: 'Programmatic Navigation',
          getView: (req, context) => getPageContent(req, context, import('./guides/programmatic-navigation/en.mdx')),
        }),

        '/routing-context': route({
          title: 'Routing Context',
          getView: (req, context) => getPageContent(req, context, import('./guides/context/en.mdx')),
        }),

        '/authenticated-routes': route({
          title: 'Authenticated Routes',
          getView: (req, context) => getPageContent(req, context, import('./guides/authenticated-routes/en.mdx')),
          data: {
            metaDescription: `Add authenticated routes to your statically rendered site, complete with redirects to and from the login screen.`,
          }
        }),

        '/static-rendering': route({
          title: 'Static Rendering',
          getView: (req, context) => getPageContent(req, context, import('./guides/static-rendering/en.mdx')),
        }),

        '/setting-head-meta-title': route({
          title: 'Setting head, title and meta tags',
          getView: (req, context) => getPageContent(req, context, import('./guides/setting-head-meta-title/en.mdx')),
          data: {
            navTitle: <>Setting <code>meta</code> and <code>title</code></>,
          },
        }),
      })
    ),

    '/reference': composeMatchers(
      withData({
        sectionTitle: 'API Reference'
      }),
      map({
        '/components-and-hooks': route({
          title: 'Components and Hooks',
          getView: (req, context) => getPageContent(req, context, import('./reference/components-and-hooks/en.mdx')),
        }),
        '/declarations': redirect('/macthers'),
        '/history': route({
          title: "Navi's history object",
          getView: (req, context) => getPageContent(req, context, import('./reference/history/en.mdx')),
          data: {
            navTitle: <code>history</code>,
          }
        }),
        '/matchers': route({
          title: 'Matchers',
          getView: (req, context) => getPageContent(req, context, import('./reference/matchers/en.mdx')),
        }),
        '/navigation': route({
          title: "The Navigation object",
          getView: (req, context) => getPageContent(req, context, import('./reference/navigation/en.mdx')),
          data: {
            navTitle: <code>navigation</code>,
          }
        }),
        '/route-and-segment': redirect(req =>
          join(req.mountpath, '..', 'data-types/')
        ),
        '/url-descriptor': redirect(req =>
          join(req.mountpath, '..', 'data-types/#urldescriptor')
        ),
        '/router': route({
          title: 'Router objects',
          getView: (req, context) => getPageContent(req, context, import('./reference/router/en.mdx')),
          data: {
            navTitle: <code>router</code>,
          }
        }),
        '/data-types': route({
          title: "Types",
          getView: (req, context) => getPageContent(req, context, import('./reference/data-types/en.mdx')),
        }),
      })
    ),

    '/integrations': composeMatchers(
      withData({
        sectionTitle: 'Usage with...'
      }),
      map({
        '/react': redirect((req, context) => join(context.naviRoot, 'reference/components-and-hooks')),

        // - TODO: express

        '/react-router': route({
          title: 'Using Navi with react-router',
          getView: (req, context) => getPageContent(req, context, import('./integrations/react-router/en.mdx')),
          data: {
            navTitle: 'react-router',
          }
        }),

        '/react-helmet': route({
          title: 'Using Navi with react-helmet',
          getView: (req, context) => getPageContent(req, context, import('./integrations/react-helmet/en.mdx')),
          data: {
            navTitle: 'react-helmet',
          }
        }),
      }),
    ),

    '/deploy': composeMatchers(
      withData({
        sectionTitle: 'Deploying'
      }),
      map({
        '/now': route({
          title: 'Deploying Navi with ZEIT Now',
          getView: (req, context) => getPageContent(req, context, import('./deploy/now/en.mdx')),
          data: {
            navTitle: 'Deploying with ZEIT Now',
          }
        }),
      })
    ),
  }),
)

async function getPageContent(req, context, modulePromise) {
  let mod = await modulePromise
  let { default: Component, demoboardHelpers, tableOfContents, filename } = mod

  let docPath = req.mountpath.replace(/\/$/, '').split('/').reverse()
  if (/^[a-z]{2}$/i.test(docPath[0])) {
    docPath.shift()
  }
  
  let translations = await req.router.resolveRouteMap(docPath.reverse().join('/'))
  
  if (!filename) {
    console.warn(`The content for URL "${req.mountpath}" should export a "filename" string.`)
  }

  return {
    Component,
    demoboardHelpers,
    tableOfContents,
    filename,
    languages: Object.values(translations).map(route => route.data.language || 'en'),
    documentComponents:
      context.getDocumentComponents ? await context.getDocumentComponents() : {},
  }
}
