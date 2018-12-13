import React from 'react'
import * as Navi from 'navi'
import { Layout } from './Layout'

export default Navi.createSwitch({
  getContent: async env =>
    <Layout
      currentUser={{}}
      isPro={true}
      repositoryRoot={env.context.repositoryRoot || ''}
      rootPathname={env.pathname || '/'}
      siteMap={await env.router.resolveSiteMap(env.pathname)}
    />,

  paths: {
    '/': Navi.createPage({
      title: "Start Here",
      getContent: env =>
        getPageContent(env, import('./start-here.md')),
      meta: {
        description: 'A batteries-included router for React.',
      },
    }),

    '/motivation': Navi.createPage({
      title: 'Motivation',
      getContent: env => getPageContent(env, import('./motivation.md')),
    }),

    // '/core-concepts': Navi.createPage({
    //   title: 'Core concepts',
    //   getContent: env => getDocumentExports(import('./core-concepts.md')),
    // }),

    // this really is a short course... probably should just add a redirect to it
    // '/tutorial': Navi.createPage({
    //   title: 'Tutorial: Make a blog',
    //   getContent: env => getDocumentExports(import('./tutorial/make-a-blog.md')),
    // }),

    '/guides': Navi.createSwitch({
      title: 'Guides',

      paths: {
        '/minimal-example': Navi.createPage({
          title: 'A Minimal Example',
          getContent: env => getPageContent(env, import('./guides/minimal-example.md')),
        }),

        '/static-rendering': Navi.createPage({
          title: 'Static Rendering',
          getContent: env => getPageContent(env, import('./guides/static-rendering.md')),
        }),

        // '/authenticated-routes': Navi.createPage({
        //   title: 'Authenticated Routes',
        //   getContent: env => getPageContent(env, import('./guides/authenticated-routes.md')),
        // }),

    //     '/integrating-express': Navi.createPage({
    //       title: 'Server Rendering with Express',
    //       getContent: env => getDocumentExports(import('./guides/integrating-express.md')),
    //     }),
      }
    }),

    // '/integrations': Navi.createSwitch({
    //   title: 'Integrations',
    //   paths: {
    //     '/react': Navi.createPage({
    //       title: 'React',
    //       getContent: env => getPageContent(env, import('./integrations/react.md')),
    //     }),

    //     // '/react-router': Navi.createPage({
    //     //   title: 'react-router',
    //     //   getContent: env => getPageContent(env, import('./integrations/react-router.md')),
    //     // }),
    //   },
    // }),

    '/reference': Navi.createSwitch({
      title: 'API Reference',
      paths: {
        '/declarations': Navi.createPage({
          title: 'Declaring pages',
          getContent: env => getPageContent(env, import('./reference/defining-pages.md')),
        }),
        // '/navigation': Navi.createPage({
        //   title: 'Navigation',
        //   getContent: env => getPageContent(env, import('./reference/navigation.md')),
        // }),
        // '/routes-segments-urls': Navi.createPage({
        //   title: 'Routes, Segments and URL Descriptors',
        //   getContent: env => getPageContent(env, import('./reference/routes-and-segments.md')),
        // }),
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
          title: 'Deploying with ZEIT Now',
          getContent: env => getPageContent(env, import('./deploy/now.md')),
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
