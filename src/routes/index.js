import React from 'react';
import {
  composeMatchers,
  map,
  redirect,
  route,
  withData,
  withView,
  withContext
} from 'navi';
import { Layout } from './Layout';
import { join } from 'path';

export default composeMatchers(
  withView(async (req, context) => (
    <Layout
      isAuthenticated={context.isAuthenticated}
      isPro={context.isPro}
      repositoryRoot={context.repositoryRoot || ''}
      rootPathname={req.mountpath || '/'}
      routeMap={
        await req.router.resolveRouteMap(req.mountpath, {
          // predicate: segment =>
          //   !segment.data ||
          //   segment.data.language === 'en'
        })
      }
    />
  )),
  withContext((req, context) => ({
    naviRoot: req.mountpath,
    ...context
  })),
  map({
    '/': route({
      title: 'Navi – A JavaScript router and static renderer',
      getView: (req, context) =>
        getPageContent(req, context, import('./start-here/start-here.md')),
      data: {
        navTableOfContents: null,
        navTitle: 'Start Here',
        socialTitle: 'Navi',
        socialImageURL: require('./social-media-card.png'),
        metaDescription:
          'Create big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app.'
      }
    }),

    '/motivation': route({
      title: 'Motivation',
      getView: (req, context) =>
        getPageContent(req, context, import('./motivation/motivation.md'))
    }),

    '/comparisons': route({
      title: 'Comparison With Similar Tools',
      getView: (req, context) =>
        getPageContent(req, context, import('./comparison/comparison.md')),
      data: {
        navTitle: 'Comparison With Similar Tools',
        socialTitle: 'Navi vs. Gatsby vs. Next.js',
        metaDescription: 'TODO'
      }
    }),

    '/create-react-navi-app': route({
      title: 'Creating A New App',
      getView: (req, context) =>
        getPageContent(req, context, import('./create-react-navi-app.md')),
      data: {
        metaDescription:
          'Zero-configuration React apps with ready-to-go routing, mdx support, and static HTML generation.',
        socialImageURL: require('./create-react-navi-app-social.png'),
        socialTitle: 'Getting started with Navi'
      }
    }),

    '/guides': composeMatchers(
      withData({
        sectionTitle: 'Guides'
      }),
      map({
        '/minimal-example': redirect('./basic-components-hooks'),
        '/getting-started': route({
          title: 'Getting Started',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/getting-started/document.mdx')
            ),
          data: {
            metaDescription: 'TODO'
          }
        }),

        '/url-parameters': route({
          title: 'URL Parameters',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/url-parameters/document.mdx')
            ),
          data: {
            metaDescription: 'TODO'
          }
        }),

        '/requests-routes-matchers': route({
          title: 'Requests, Routes and Matchers',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/requests-routes-matchers/document.mdx')
            ),
          data: {
            metaDescription: 'TODO'
          }
        }),

        '/layouts-nested-content': redirect('/nested-views'),
        '/nested-views': route({
          title: 'Nested Routes and Views',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/nested-views/document.mdx')
            ),
          data: {
            metaDescription: `Learn to add nested views and layouts to your routes, allowing you to create entire apps that can be embedded anywhere.`
          }
        }),

        '/programmatic-navigation': route({
          title: 'Programmatic Navigation',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/programmatic-navigation/document.mdx')
            ),
          data: {
            metaDescription: 'TODO'
          }
        }),

        '/routing-context': route({
          title: 'Routing Context',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/context/document.mdx')
            ),
          data: {
            metaDescription: `TODO`
          }
        }),

        '/authenticated-routes': route({
          title: 'Authenticated Routes',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/authenticated-routes/document.mdx')
            ),
          data: {
            metaDescription: `Add authenticated routes to your statically rendered site, complete with redirects to and from the login screen.`
          }
        }),

        '/static-rendering': route({
          title: 'Static Rendering with Navi',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/static-rendering/document.mdx')
            ),
          data: {
            metaDescription: `TODO`
          }
        }),

        '/setting-head-meta-title': route({
          title: 'Setting head, title and meta tags',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./guides/setting-head-meta-title/document.mdx')
            ),
          data: {
            navTitle: (
              <>
                Setting <code>meta</code> and <code>title</code>
              </>
            ),
            metaDescription: `TODO`
          }
        })
      })
    ),

    '/reference': composeMatchers(
      withData({
        sectionTitle: 'API Reference'
      }),
      map({
        '/components-and-hooks': route({
          title: 'Components and Hooks',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./reference/components-and-hooks.mdx')
            )
        }),
        '/declarations': redirect('/macthers'),
        '/history': route({
          title: "Navi's history object",
          getView: (req, context) =>
            getPageContent(req, context, import('./reference/history.md')),
          data: {
            navTitle: <code>history</code>
          }
        }),
        '/matchers': route({
          title: 'Matchers',
          getView: (req, context) =>
            getPageContent(req, context, import('./reference/matchers.md'))
        }),
        '/navigation': route({
          title: 'The Navigation object',
          getView: (req, context) =>
            getPageContent(req, context, import('./reference/navigation.md')),
          data: {
            navTitle: <code>navigation</code>
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
          getView: (req, context) =>
            getPageContent(req, context, import('./reference/router.md')),
          data: {
            navTitle: <code>router</code>
          }
        }),
        '/data-types': route({
          title: 'Types',
          getView: (req, context) =>
            getPageContent(req, context, import('./reference/data-types.md'))
        })
      })
    ),

    '/integrations': composeMatchers(
      withData({
        sectionTitle: 'Usage with...'
      }),
      map({
        '/react': redirect((req, context) =>
          join(context.naviRoot, 'reference/components-and-hooks')
        ),

        // - TODO: express

        '/react-router': route({
          title: 'Using Navi with react-router',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./integrations/react-router.md')
            ),
          data: {
            navTitle: 'react-router'
          }
        }),

        '/react-helmet': route({
          title: 'Using Navi with react-helmet',
          getView: (req, context) =>
            getPageContent(
              req,
              context,
              import('./integrations/react-helmet.md')
            ),
          data: {
            navTitle: 'react-helmet'
          }
        })
      })
    ),

    '/deploy': composeMatchers(
      withData({
        sectionTitle: 'Deploying'
      }),
      map({
        '/now': route({
          title: 'Deploying Navi with ZEIT Now',
          getView: (req, context) =>
            getPageContent(req, context, import('./deploy/now.md')),
          data: {
            navTitle: 'Deploying with ZEIT Now'
          }
        }),
        '/netlify': route({
          title: 'Deploying Navi with Netlify',
          getView: (req, context) =>
            getPageContent(req, context, import('./deploy/netlify.md')),
          data: {
            navTitle: 'Deploying with Netlify'
          }
        })
      })
    )
  })
);

async function getPageContent(req, context, modulePromise) {
  let mod = await modulePromise;
  let { default: Component, demoboardHelpers, tableOfContents, filename } = mod;

  let docPath = req.mountpath
    .replace(/\/$/, '')
    .split('/')
    .reverse();
  if (/^[a-z]{2}$/i.test(docPath[0])) {
    docPath.shift();
  }

  let translations = await req.router.resolveRouteMap(
    docPath.reverse().join('/')
  );

  if (!filename) {
    console.warn(
      `The content for URL "${
        req.mountpath
      }" should export a "filename" string.`
    );
  }

  return {
    Component,
    demoboardHelpers,
    tableOfContents,
    filename,
    languages: Object.values(translations).map(
      route => route.data.language || 'en'
    ),
    documentComponents: context.getDocumentComponents
      ? await context.getDocumentComponents()
      : {}
  };
}
