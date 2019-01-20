export const filename = __filename
import { Document } from '@frontarm/document'
export const demoboardHelpers = {
  'App.js': require('!raw-loader!./create-react-navi-app/App.js'),
  'index.js': require('!raw-loader!./create-react-navi-app/index.js'),
  'pages.js': require('!raw-loader!./create-react-navi-app/pages.js'),
  'getting-started.mdx': require('!raw-loader!./create-react-navi-app/getting-started.mdx'),
  'index.mdx': require('!raw-loader!./create-react-navi-app/index.mdx'),
  'styles.css': require('!raw-loader!./create-react-navi-app/styles.css'),
}

Create React/Navi App
=====================

The easiest way to try Navi is with the `create-react-navi-app` tool -- a small wrapper around Create React App 2 that provides three extra features:

- **Pre-configured routing** -- letting you dive in and start building straight away
- **Static rendering for all pages** -- improving load times and SEO<br />
- **MDX support** -- for quickly creating text content<br />

Of course, it also includes all the standard Create React App features that you've come to love, including zero-configuration build and TypeScript support! For full details, see the excellent [Create React App documentation](https://facebook.github.io/create-react-app/).


Quick Overview
--------------

Usage is identical to the `create-react-app` command -- you'll just need to call `create-react-navi-app` instead.

```bash
npx create-react-navi-app my-app
cd my-app
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app, if it isn't automatically opened for you.

Once you’re ready to deploy to production, create a minified bundle with `npm run build`. Then, you can test your minified bundle by calling `npm run serve`.



For more details on the available commands, see the [Scripts guide](https://facebook.github.io/create-react-app/docs/available-scripts) on the Create React App website.


Pages
-----

After running `create-react-navi-app`, your generated app will look much the same as a standard create-react-app project -- but with a `src/pages` directory. This directory initially contains content for two pages:

- `/`
- `/getting-started/`

Both pages are declared in `src/pages/index.js`:

```js
//--- pages.js <-- pages.js
//--- App.js <-- App.js
//--- index.mdx <-- index.mdx
//--- getting-started.mdx <-- getting-started.mdx
//--- index.js <-- index.js
//--- styles.css <-- styles.css
```

You have four functions available for declaring your app's pages:

- [`Navi.createSwitch()`](../reference/declarations/#createswitch)
- [`Navi.createPage()`](../reference/declarations/#createpage)
- [`Navi.createRedirect()`](../reference/declarations/#createredirect)
- [`Navi.createContext()`](../reference/declarations/#createcontext)

These functions all allow for their content to be fetched asynchronously from an API, database, dynamic `import()`, etc. For example, you might fetch a list of posts with a serverless `getPosts()` function:

```js
import * as Navi from 'navi'
import React from 'react'
import PostList from './PostList'

export default Navi.createSwitch({
  paths: {
    '/': async env => {
      let posts = await getPosts()

      return Navi.createPage({
        title: "React Site",
        content: <PostList posts={posts} />,
      }),
    }
  }
})
```

For more details, see the [Declaring Pages guide](../reference/declarations/).


The `<App>` component
---------------------

Your new `<App>` component will look a little different to the standard create-react-app one, as it's responsible for rendering the navigation state passed via its [`navigation` prop](../reference/navigation/).

```js
//---
editorPathname: /App.js
//--- pages.js <-- pages.js
//--- App.js <-- App.js
//--- index.mdx <-- index.mdx
//--- getting-started.mdx <-- getting-started.mdx
//--- index.js <-- index.js
//--- styles.css <-- styles.css
```

Here's a quick breakdown of what the various Nav components do:

- [`<NavProvider>`](../integrations/react/#navprovider) subscribes to the app's navigation state, and provides the latest state to its descendents via [React Context](https://reactjs.org/docs/context.html).
- [`<NavContent>`](../integrations/react/#navcontent) renders the first `content` object in a Switch or Page that matches the current URL.
- [`<NavNotFoundBoundary>`](../integrations/react/#navnotfoundboundary) catches `NotFoundError` exceptions thrown by `<NavContent>`, and renders your provided 404 message until the user navigates to another page.
- [`<NavLoading>`](../integrations/react/#navloading) provides acccess to the route that is currently loading (if it exists) via a [render prop](https://reactjs.org/docs/render-props.html). If there the current route has fully loaded, the render prop's argument will be `undefined`, allowing a loading overlay to be shown while the next page's content is loading.

For more details on these components, see the [React Integration](../integrations/react/) guide.


TypeScript support
------------------

Navi is built with TypeScript, and that means you'll always have access to solid, up-to-date types. And given that Create React App now supports TypeScript, it's super easy to get started!

To create an app using Navi's TypeScript template, just pass a `--typescript` option at *the end* of the command:

```bash
npx create-react-navi-app my-typescript-app --typescript
```

This will generate a project with TypeScript files instead of JavaScript files, along with a declaration file to ensure that you can import `.mdx` files.


Acknowledgements
----------------

A huge thanks is in order for the authors of create-react-app. It's a pleasure to work with, and this project wouldn't be possible without it.

