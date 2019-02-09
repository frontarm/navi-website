import React from 'react'
import { composeMatchers, map, redirect, route, withData, withView } from 'navi'
import { Layout } from './Layout'
import path from 'path'

export default composeMatchers(
  withView(async (req, context) =>
    <Layout
      isAuthenticated={context.isAuthenticated}
      isPro={context.isPro}
      repositoryRoot={context.repositoryRoot || ''}
      rootPathname={req.mountpath || '/'}
      routeMap={await req.router.resolveRouteMap(req.mountpath, {
        // predicate: segment =>
        //   !segment.data ||
        //   segment.data.language === 'en'
      })}
    />
  ),
  map({
    '/': route({
      title: "Navi – A JavaScript router and static renderer",
      getView: (req, context) => getPageContent(req, context, import('./start-here.md')),
      data: {
        navTitle: 'Start Here',
        socialTitle: 'Navi',
        socialImageURL: require('./social-media-card.png'),
        metaDescription: 'Create big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app.',
      },
    }),

    '/motivation': route({
      title: 'Why Navi?',
      getView: (req, context) => getPageContent(req, context, import('./motivation.md')),
    }),

    '/create-react-navi-app': route({
      title: 'Create React/Navi App',
      getView: (req, context) => getPageContent(req, context, import('./create-react-navi-app.md')),
      data: {
        metaDescription: 'Zero-configuration React apps with ready-to-go routing, mdx support, and static HTML generation.',
        socialImageURL: require('./create-react-navi-app-social.png'),
      },
    }),

    // '/core-concepts': route({
    //   title: 'Core concepts',
    //   getView: req => getDocumentExports(import('./core-concepts.md')),
    // }),

    '/guides': composeMatchers(
      withData({
        sectionTitle: 'Guides'
      }),
      map({
        '/minimal-example': route({
          title: 'A Minimal Example of Navi',
          getView: (req, context) => getPageContent(req, context, import('./guides/minimal-example.md')),
          data: {
            navTitle: 'A Minimal Example'
          },
        }),

        // '/minimal-example': createPagesForLanguages({
        //   en: {
        //     importMDX: () => import('./guides/minimal-example.md'),
        //     title: 'A Minimal Example of Navi',
        //     data: {
        //       navTitle: 'A Minimal Example'
        //     },
        //   },
        //   ja: {
        //     importMDX: () => import('./guides/minimal-example.ja.md'),
        //     title: '簡単な例',
        //     data: {
        //       navTitle: '簡単な例'
        //     },
        //   }
        // }),

        '/static-rendering': route({
          title: 'Static Rendering with Navi',
          getView: (req, context) => getPageContent(req, context, import('./guides/static-rendering.md')),
          data: {
            navTitle: 'Static Rendering'
          },
        }),

        '/authenticated-routes': route({
          title: 'Authenticated Routes with Navi',
          getView: (req, context) => getPageContent(req, context, import('./guides/authenticated-routes.md')),
          data: {
            navTitle: 'Authenticated Routes',
            metaDescription: `Add authenticated routes to your statically rendered site, complete with redirects to and from the login screen.`,
          }
        }),

        '/layouts-nested-content': route({
          title: 'Layouts and Nested Content with Navi',
          getView: (req, context) => getPageContent(req, context, import('./guides/layouts-nested-content.md')),
          data: {
            navTitle: "Layouts and Nested Content",
            metaDescription: `Learn to add nested layouts to your routes, allowing you to create entire apps that can be embedded anywhere.`
          }
        }),

    //     '/integrating-express': route({
    //       title: 'Server Rendering with Express',
    //       getView: req => getDocumentExports(import('./guides/integrating-express.md')),
    //     }),
      })
    ),

    '/integrations': composeMatchers(
      withData({
        sectionTitle: 'Integrations'
      }),
      map({
        '/react': route({
          title: 'Using Navi with React',
          getView: (req, context) => getPageContent(req, context, import('./integrations/react.md')),
          data: {
            navTitle: 'Usage with React',
          }
        }),

        '/react-router': route({
          title: 'Using Navi with react-router',
          getView: (req, context) => getPageContent(req, context, import('./integrations/react-router.md')),
          data: {
            navTitle: 'Usage with react-router',
          }
        }),

        '/react-helmet': route({
          title: 'Using Navi with react-helmet',
          getView: (req, context) => getPageContent(req, context, import('./integrations/react-helmet.md')),
          data: {
            exclusiveTo: 'Pro',
            navTitle: 'Usage with react-helmet',
          }
        }),
      }),
    ),

    '/reference': composeMatchers(
      withData({
        sectionTitle: 'API Reference'
      }),
      map({
        '/data-types': route({
          title: "Data Types – Navi",
          getView: (req, context) => getPageContent(req, context, import('./reference/data-types.md')),
          data: {
            navTitle: "Data Types",
          }
        }),
        '/declarations': route({
          title: 'Declaring pages with Navi',
          getView: (req, context) => getPageContent(req, context, import('./reference/defining-pages.md')),
          data: {
            navTitle: 'Declaring pages',
          }
        }),
        '/history': route({
          title: "Navi's history object",
          getView: (req, context) => getPageContent(req, context, import('./reference/history.md')),
          data: {
            navTitle: <code>history</code>,
          }
        }),
        '/navigation': route({
          title: "The Navigation object – Navi",
          getView: (req, context) => getPageContent(req, context, import('./reference/navigation.md')),
          data: {
            navTitle: <code>navigation</code>,
          }
        }),
        '/route-and-segment': redirect(req =>
          path.join(req.mountpath, '..', 'data-types/')+req.url.hash
        ),
        '/url-descriptor': redirect(req =>
          path.join(req.mountpath, '..', 'data-types/#urldescriptor')
        ),
        '/router': route({
          title: 'Router objects – Navi',
          getView: (req, context) => getPageContent(req, context, import('./reference/router.md')),
          data: {
            navTitle: <code>router</code>,
          }
        }),
      })
    ),

    '/deploy': composeMatchers(
      withData({
        sectionTitle: 'Deploying'
      }),
      map({
        '/now': route({
          title: 'Deploying Navi with ZEIT Now',
          getView: (req, context) => getPageContent(req, context, import('./deploy/now.md')),
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
