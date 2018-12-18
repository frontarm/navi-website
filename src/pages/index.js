import React from 'react'
import * as Navi from 'navi'
import { Layout } from './Layout'

export default Navi.createSwitch({
  getContent: async env =>
    <Layout
      isPro={env.context.isPro}
      repositoryRoot={env.context.repositoryRoot || ''}
      rootPathname={env.pathname || '/'}
      siteMap={await env.router.resolveSiteMap(env.pathname)}
    />,

  paths: {
    '/': Navi.createPage({
      title: "Navi – A JavaScript router and static renderer",
      getContent: env =>
        getPageContent(env, import('./start-here.md')),
      meta: {
        navTitle: 'Start Here',
        socialTitle: 'Navi',
        socialImageURL: require('./social-media-card.png'),
        metaDescription: 'Create big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app.',
      },
    }),

    '/motivation': Navi.createPage({
      title: 'Why Navi?',
      getContent: env => getPageContent(env, import('./motivation.md')),
    }),

    '/create-react-navi-app': Navi.createPage({
      title: 'Create React/Navi App',
      getContent: env => getPageContent(env, import('./create-react-navi-app.md')),
      meta: {
        metaDescription: 'Zero-configuration React apps with ready-to-go routing, mdx support, and static HTML generation.',
        socialImageURL: require('./create-react-navi-app-social.png'),
      },
    }),

    // '/core-concepts': Navi.createPage({
    //   title: 'Core concepts',
    //   getContent: env => getDocumentExports(import('./core-concepts.md')),
    // }),

    '/guides': Navi.createSwitch({
      title: 'Guides',

      paths: {
        '/minimal-example': Navi.createPage({
          title: 'A Minimal Example of Navi',
          getContent: env => getPageContent(env, import('./guides/minimal-example.md')),
          meta: {
            navTitle: 'A Minimal Example'
          },
        }),

        '/static-rendering': Navi.createPage({
          title: 'Static Rendering with Navi',
          getContent: env => getPageContent(env, import('./guides/static-rendering.md')),
          meta: {
            navTitle: 'Static Rendering'
          },
        }),

        '/authenticated-routes': Navi.createPage({
          title: 'Authenticated Routes with Navi',
          getContent: env => getPageContent(env, import('./guides/authenticated-routes.md')),
          meta: {
            navTitle: 'Authenticated Routes',
            metaDescription: `Add authenticated routes to your statically rendered site, complete with redirects to and from the login screen.`,
          }
        }),

    //     '/integrating-express': Navi.createPage({
    //       title: 'Server Rendering with Express',
    //       getContent: env => getDocumentExports(import('./guides/integrating-express.md')),
    //     }),
      }
    }),

    '/integrations': Navi.createSwitch({
      title: 'Integrations',
      paths: {
        '/react': Navi.createPage({
          title: 'Using Navi with React',
          getContent: env => getPageContent(env, import('./integrations/react.md')),
          meta: {
            navTitle: 'Usage with React',
          }
        }),

        '/react-router': Navi.createPage({
          title: 'Using Navi with react-router',
          getContent: env => getPageContent(env, import('./integrations/react-router.md')),
          meta: {
            navTitle: 'Usage with react-router',
          }
        }),
      },
    }),

    '/reference': Navi.createSwitch({
      title: 'API Reference',
      paths: {
        '/declarations': Navi.createPage({
          title: 'Declaring pages with Navi',
          getContent: env => getPageContent(env, import('./reference/defining-pages.md')),
          meta: {
            navTitle: 'Declaring pages',
          }
        }),
        '/history': Navi.createPage({
          title: "Navi's history object",
          getContent: env => getPageContent(env, import('./reference/history.md')),
          meta: {
            navTitle: <code>history</code>,
          }
        }),
        '/navigation': Navi.createPage({
          title: "The Navigation object – Navi",
          getContent: env => getPageContent(env, import('./reference/navigation.md')),
          meta: {
            navTitle: <code>navigation</code>,
          }
        }),
        '/route-and-segment': Navi.createPage({
          title: "Route objects – Navi",
          getContent: env => getPageContent(env, import('./reference/routes-and-segments.md')),
          meta: {
            navTitle: <><code>Route</code> and <code>Segment</code></>,
          }
        }),
        '/url-descriptor': Navi.createPage({
          title: "URLDescriptor objects – Navi",
          getContent: env => getPageContent(env, import('./reference/url-descriptor.md')),
          meta: {
            navTitle: <code>URLDescriptor</code>,
          }
        }),
        // '/router': Navi.createPage({
        //   title: 'Router',
        //   getContent: env => getPageContent(env, import('./reference/router.md')),
        // }),
      }
    }),

    '/deploy': Navi.createSwitch({
      title: 'Deploying',
      paths: {
        '/now': Navi.createPage({
          title: 'Deploying Navi with ZEIT Now',
          getContent: env => getPageContent(env, import('./deploy/now.md')),
          meta: {
            navTitle: 'Deploying with ZEIT Now',
          }
        }),
      }
    }),
  },
})

async function getPageContent(env, modulePromise) {
  let mod = await modulePromise
  let { default: Component, demoboardHelpers, tableOfContents, filename } = mod

  if (!filename) {
    console.warn(`The content for URL "${env.pathname}" should export a "filename" string.`)
  }

  return {
    Component,
    demoboardHelpers,
    tableOfContents,
    filename,
    documentComponents:
      env.context.getDocumentComponents ? await env.context.getDocumentComponents() : {},
  }
}
