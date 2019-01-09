import React from 'react'
import * as Navi from 'navi'
import { Layout } from './Layout'
import path from 'path'

export default Navi.createSwitch({
  getContent: async env =>
    <Layout
      isAuthenticated={env.context.isAuthenticated}
      isPro={env.context.isPro}
      repositoryRoot={env.context.repositoryRoot || ''}
      rootPathname={env.mountname || '/'}
      siteMap={await env.router.resolveSiteMap(env.mountname)}
    />,

  paths: {
    '/': Navi.createPage({
      title: "Navi – A JavaScript router and static renderer",
      getContent: env => getPageContent(env, import('./start-here.md')),
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

        '/layouts-nested-content': Navi.createPage({
          title: 'Layouts and Nested Content with Navi',
          getContent: env => getPageContent(env, import('./guides/layouts-nested-content.md')),
          meta: {
            navTitle: "Layouts and Nested Content",
            metaDescription: `Learn to add nested layouts to your routes, allowing you to create entire apps that can be embedded anywhere.`
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

        '/react-helmet': Navi.createPage({
          title: 'Using Navi with react-helmet',
          getContent: env => getPageContent(env, import('./integrations/react-helmet.md')),
          meta: {
            exclusiveTo: 'Pro',
            navTitle: 'Usage with react-helmet',
          }
        }),
      },
    }),

    '/reference': Navi.createSwitch({
      title: 'API Reference',
      paths: {
        '/data-types': Navi.createPage({
          title: "Data Types – Navi",
          getContent: env => getPageContent(env, import('./reference/data-types.md')),
          meta: {
            navTitle: "Data Types",
          }
        }),
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
        '/route-and-segment': Navi.createRedirect(env =>
          path.join(env.mountname, '..', 'data-types/')+env.url.hash
        ),
        '/url-descriptor': Navi.createRedirect(env =>
          path.join(env.mountname, '..', 'data-types/#urldescriptor')
        ),
        '/router': Navi.createPage({
          title: 'Router objects – Navi',
          getContent: env => getPageContent(env, import('./reference/router.md')),
          meta: {
            navTitle: <code>router</code>,
          }
        }),
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
    console.warn(`The content for URL "${env.mountname}" should export a "filename" string.`)
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
