import React from 'react'
import { compose, mount, route, withData } from 'navi'

export default mount({
  '/': page({
    getDocument: (language) => import(`./start-here/document.${language}.mdx`),
    default: {
      title: "Navi",
      htmlTitle: "Navi",
      navTitle: 'Start Here',
      description: 'Declarative, asynchronous routing for React.',
      navTableOfContents: null,
    },
    ja: {
      navTitle: 'ここで始める',
    },
  }),

  '/motivation': page({
    getDocument: (language) => import(`./motivation/document.${language}.mdx`),
    default: {
      title: 'The Motivation For Navi 🌏',
      htmlTitle: 'The Motivation For Navi',
      navTableOfContents: null,
      navTitle: 'Motivation',
      description: `Navi lets you create big, fast, CDN-delivered apps with great SEO & SMO — and all with vanilla create-react-app.`,
    },
  }),

  '/comparisons': page({
    getDocument: (language) => import(`./comparison/document.${language}.mdx`),
    default: {
      title: "Is Navi For Me❓",
      htmlTitle: "Is Navi For Me?",
      navTitle: 'Comparison With Similar Tools',
      description: 'Navi is small routing library that gives you many of the benefits of larger frameworks.',
      blurb: `Navi is small routing library that — when combined with the rest of the React ecosystem — gives you many of the benefits of larger frameworks.`
    },
  }),

  '/create-react-navi-app': page({
    getDocument: (language) => import(`./create-react-navi-app/document.${language}.mdx`),
    default: {
      title: 'Create A New App ✨',
      htmlTitle: 'Create A New App – Navi',
      navTitle: 'Create a New App',
      description: 'Zero-configuration React apps with ready-to-go routing, MDX support, and static HTML generation.',
      blurb: 'Add Navi to your create-react-app project in three steps, or get a head start with one of Navi’s starter kits.',
      socialImageURL: require('./create-react-navi-app/social.png'),
    },
  }),

  '/release-history': page({
    getDocument: (language) => import(`./release-history/document.${language}.mdx`),
    default: {
      title: 'Release History 📜',
      htmlTitle: 'Release History – Navi',
      navTitle: 'Release History',
      socialImageURL: require('./create-react-navi-app/social.png'),
    },
  }),

  '/guides': compose(
    withData({
      sectionTitle: 'Guides'
    }),
    mount({
      '/getting-started': page({
        getDocument: (language) => import(`./guides/getting-started/document.${language}.mdx`),
        default: {
          title: 'Getting Started',
          description: 'This guide will walk you through the process of adding routing to a fresh create-react-app project, using Navi.',
        },
        ja: {
          title: '始めよう',
          description: 'このガイドでは create-react-app を用いて作成したまっさらなプロジェクトに、Navi を使ってルーティング機能を追加していきます。',
          navTitle: '始めよう',
        },
      }),

      '/url-parameters': page({
        getDocument: (language) => import(`./guides/url-parameters/document.${language}.mdx`),
        default: {
          title: 'URL Parameters',
          description: 'URL parameters let you declare routes, views and data that depend on the current URL.',
        },
        ja: {
          title: 'URL パラメータ',
          description: 'URL パラメータを用いることで、現在の URL にもとずいて route, view, data の宣言をすることができます。',
          navTitle: 'URL パラメータ',
        },
      }),

      '/requests-routes-matchers': page({
        getDocument: (language) => import(`./guides/requests-routes-matchers/document.${language}.mdx`),
        default: {
          title: 'Requests, Routes and Matchers',
          description: 'At its core, Navi is just a tool for mapping Requests to Routes; to accomplish this, it uses a pattern called Matchers.',
        },
      }),

      '/nested-views': page({
        getDocument: (language) => import(`./guides/nested-views/document.${language}.mdx`),
        default: {
          title: 'Nested Routes and Views',
          description: `Learn to add nested views and layouts to your routes, allowing you to create entire apps that can be embedded anywhere.`
        },
      }),

      '/programmatic-navigation': page({
        getDocument: (language) => import(`./guides/programmatic-navigation/document.${language}.mdx`),
        default: {
          title: 'Programmatic Navigation',
        },
      }),

      '/routing-context': page({
        getDocument: (language) => import(`./guides/context/document.${language}.mdx`),
        default: {
          title: 'Routing Context',
        },
      }),

      '/authenticated-routes': page({
        getDocument: (language) => import(`./guides/authenticated-routes/document.${language}.mdx`),
        default: {
          title: 'Authenticated Routes',
          description: `Add authenticated routes to your statically rendered site, complete with redirects to and from the login screen.`,
        }
      }),

      '/static-rendering': page({
        getDocument: (language) => import(`./guides/static-rendering/document.${language}.mdx`),
        default: {
          title: 'Static Rendering',
        },
      }),

      '/setting-head-meta-title': page({
        getDocument: (language) => import(`./guides/setting-head-meta-title/document.${language}.mdx`),
        default: {
          title: <>SEO with <code>&lt;meta&gt;</code> and <code>&lt;title&gt;</code></>,
          htmlTitle: 'Setting head, title and meta tags',
          navTitle: <>Setting <code>meta</code> and <code>title</code></>,
        },
      }),
    })
  ),

  '/reference': compose(
    withData({
      sectionTitle: 'API Reference'
    }),
    mount({
      '/react-components-hooks': page({
        getDocument: (language) => import(`./reference/react-components-hooks/document.${language}.mdx`),
        default: {
          title: 'Components and Hooks',
        }
      }),
      '/matchers': page({
        getDocument: (language) => import(`./reference/matchers/document.${language}.mdx`),
        default: {
          title: 'Matchers',
        }
      }),
      '/navigation': page({
        getDocument: (language) => import(`./reference/navigation/document.${language}.mdx`),
        default: {
          title: "The Navigation object",
          navTitle: <code>navigation</code>,
        }
      }),
      '/router': page({
        getDocument: (language) => import(`./reference/router/document.${language}.mdx`),
        default: {
          title: 'Functions',
          navTitle: <code>functions</code>,
        }
      }),
      '/data-types': page({
        getDocument: (language) => import(`./reference/data-types/document.${language}.mdx`),
        default: {
          title: "Types",
        }
      }),
    })
  ),

  '/integrations': compose(
    withData({
      sectionTitle: 'Usage with...'
    }),
    mount({
      // - TODO: universal-react-scripts

      '/styled-components': page({
        getDocument: (language) => import(`./integrations/styled-components/document.${language}.mdx`),
        default: {
          title: 'Using Navi with styled-components',
          navTitle: 'styled-components',
        },
      }),

      '/react-helmet': page({
        getDocument: (language) => import(`./integrations/react-helmet/document.${language}.mdx`),
        default: {
          title: 'Using Navi with react-helmet',
          navTitle: 'react-helmet',
        },
        ja: {
          title: 'react-helment の使い方',
        },
      }),

      '/react-router': page({
        getDocument: (language) => import(`./integrations/react-router/document.${language}.mdx`),
        default: {
          title: 'Using Navi with react-router',
          navTitle: 'react-router',
        }
      }),

      '/react-spring': page({
        getDocument: (language) => import(`./integrations/react-spring/document.${language}.mdx`),
        default: {
          title: 'Using Navi with react-spring',
          navTitle: 'react-spring',
          htmlTitle: 'Animated route transitions with react-spring and Navi',
          description: 'Learn to create simple route transitions using three react hooks from react-spring and react-navi.',
        },
      }),
    }),
  ),

  '/deploy': compose(
    withData({
      sectionTitle: 'Deploy with...'
    }),
    mount({
      '/netlify': page({
        getDocument: (language) => import(`./deploy/netlify/document.${language}.mdx`),
        default: {
          title: 'Deploying Navi with Netlify',
          navTitle: 'Deploy with Netlify',
        }
      }),

      '/now': page({
        getDocument: (language) => import(`./deploy/now/document.${language}.mdx`),
        default: {
          title: 'Deploying Navi with ZEIT Now',
          navTitle: 'Deploy with ZEIT Now',
        }
      }),
    })
  ),
})

function page({ getDocument, default: base, ...languages }) {
  const getData = (req, context) => {
    let language = context.language || 'en'
    let data = {
      ...base,
      ...languages[language],
      translations: Array.from(new Set(['en'].concat(Object.keys(languages))))
    }

    if (!data.htmlTitle) {
      data.htmlTitle = data.title + ' – Navi'
    }

    if (!data.blurb) {
      data.blurb = data.description
    }
    if (data.blurb && !React.isValidElement(data.blurb)) {
      data.blurb = <p>{data.blurb}</p>
    }

    if (data.description) {
      data.metaDescription = data.description
    }

    return data
  }

  const getTitle = (req, context) => getData(req, context).htmlTitle

  const getView = async (req, context) => {
    let language = context.language || 'en'
    let isTranslationMissing = false
    let documentModule
    try {
      documentModule = await getDocument(language)
    }
    catch (e) {
      documentModule = await getDocument('en')
      isTranslationMissing = true
    }

    let { default: Component, demoboardHelpers, tableOfContents, filename, ...other } = documentModule

    if (!filename) {
      console.warn(`The content for URL "${req.mountpath}" should export a "filename" string.`)
    }

    return {
      ...other,
      Component,
      demoboardHelpers,
      tableOfContents,
      filename,
      isTranslationMissing,
      documentComponents:
        context.getDocumentComponents ? await context.getDocumentComponents() : {},
    }
  }

  return route({
    getTitle,
    getData,
    getView,
  })
}
