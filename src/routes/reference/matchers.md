export const filename = __filename
export const demoboardHelpers = {
  'App.js': require('!raw-loader!./matchers/App.js'),
  'index.js': require('!raw-loader!./matchers/index.js'),
  'styles.css': require('!raw-loader!./matchers/styles.css'),
}

Declaring Pages
===============

Navi provides four **declaration functions**, which you'll use to map URL paths to pages and their content:

- [createSwitch()](#createswitch)
- [createPage()](#createpage)
- [createRedirect()](#createredirect)
- [createContext()](#createcontext)

Each of these functions returns a **`Declaration` object**, i.e. one of `Switch`, `Page`, `Redirect` or `Context`. You can pass these declaration objects to a Switch's `paths` option to build your routing tree.


`createSwitch()`
---------------

```typescript
createSwitch(options: {
  paths: {
    [name: string]: Declaration | (env => Declaration)
  },

  // Optionally one of:
  title?: string,
  getTitle?: (env) => string | Promise<string>,

  // Optionally one of:
  content?: any,
  getContent?: (env) => any | Promise<any>,

  // Optionally one of:
  meta?: object,
  getMeta?: (env) => object | Promise<object>,
})
```

A switch's `paths` object is how you map URLs to pages and redirects. Switch paths can also be specified as [getter functions](#constants-vs-getters), allowing a path's children to vary with the switch's context.

The `content`, `meta` or `title` options are entirely optional; Navi itself doesn't actually make use of them. However, if you *do* provide them, then their values will be available in [`Route`](../data-types/#route) objects for URLs that match this switch.


### Examples

#### Basic usage

The `paths` object is used to map your app's URLs to Pages, Redirects, and more Switches. For example, this `paths` object specifies two URLs -- one that maps to a page with content read from another file, and a second route that redirects back to the first one.

```js
//--- pages.js
import * as Navi from 'navi'

export default Navi.createSwitch({
  paths: {
    '/about': Navi.createPage({
      title: 'The createSwitch() function',
      getContent: () => import('./about.mdx'),
    }),

    '/': Navi.createRedirect('./about'),
  }
})
//--- index.js <-- index.js
//--- App.js <-- App.js
//--- styles.css <-- styles.css
//--- about.mdx
# About This Example

I'm afraid it ain't much to look at.

There ain't anything but this here about page. The `/` URL just redirects to `/about`, and here you are!
```


#### Nested switches

You can compose multiple switches together to create a bigger switch -- just as you'd compose React components or Redux reducers. 

```js
export default createSwitch({
  paths: {
    '/plans': Navi.createSwitch({
      paths: {
        '/pro': Navi.createPage({
          title: 'Pro',
          getContent: () => import('./pro-plan.mdx'),
        }),
        '/team': Navi.createPage({
          title: 'Team',
          getContent: () => import('./team-plan.mdx'),
        }),
      }
    }),

    '/': Navi.createRedirect('./plans/pro'),
  }
})
```


#### The `/` path

Within the paths object, the `/` path is special; it is used to represent the content of the URL at which the Switch itself is mounted at. Because of this, it only makes sense to map `/` to `Page` or `Redirect` objects. Mapping `/` to a `Switch` would be odd, so it isn't supported.

If you don't provide a `/` path for a switch, then accessing the switch directly will result in a 404. For example, accessing `/plans` in this example will result in a 404.
 
```js
export default createSwitch({
  paths: {
    '/plans': Navi.createSwitch({
      paths: {
        '/pro': Navi.createPage({
          title: 'Pro',
          getContent: () => import('./pro-plan.mdx'),
        }),
        '/team': Navi.createPage({
          title: 'Team',
          getContent: () => import('./team-plan.mdx'),
        }),
      }
    }),

    '/': Navi.createRedirect('./plans/pro'),
  }
})
```

Because of this, it often makes sense to map the `/` path of your switch to a redirect. When doing so, remember to pass a relative URL to `createRedirect()`, as absolute URLs can break composition!


#### URL parameters

It's possible to specify wildcard segments by starting the segment with the `:` character. The values of these wildcard segments will be made available via your [`Route`](../data-types/#route) or [`Env`](#env-objects) objects' `params` property.

For example, this `paths` object specifies that any URL of the form `/resource/:id`, where `:id` can be anything, contains a page whose content and title depends on the result of `fetchResource(:id)`.

```js
export default Navi.createSwitch({
  paths: {
    '/resource/:id': async env => {
      let resource = await fetchResource(env.params.id)

      return createPage({
        title: resource.title,
        content: resource.content,
      })
    }
  }
}
```


#### Conditional paths

It's possible to compute a path's mapped `Page`, `Redirect` or `Switch` at runtime by passing in a [getter function](#constants-vs-getters). In fact, it's possible to choose to map a `Page` in some cases, and a `Redirect` in others, depending on the value of `env.context`:

For example, here's how you'd declare a switch that redirects it's `/members` path to a `/login` page unless the user has already authenticated:

```js
export default Navi.createSwitch({
  paths: {
    '/members': env =>
      !env.context.currentUser ? (
        Navi.createRedirect(
          '/login?redirectTo='+encodeURIComponent(env.mountname)
        )
      ) : (
        Navi.createPage({
          title: 'My Page',
          content: <div>My Page Content</div>,
        })
      )
  }
})
```


`createPage()`
--------------

```typescript
createPage(options: {
  // One of:
  title?: string,
  getTitle?: (env) => string | Promise<string>,

  // One of:
  content?: any,
  getContent?: (env) => any | Promise<any>,

  // Optionally one of:
  meta?: object,
  getMeta?: (env) => object | Promise<object>,
})
```

Creates a `Page` declaration, which you can map to a URL with the `createSwitch()` function's `paths` object.

The page's `title`, `meta` and `content` can be specified as a constant value, or as a [getter function](#constants-vs-getters). 

At minimum, each `Page` should specify a title, as Navi will set the document's `<title>` to this title whenever the user navigates to the page. It also makes sense to specify the page's content, because well... it's a page.

The contents of the `meta` object are used by Navi's default static renderer in deciding which `<meta>` tags to add to the page `<head>`. However, if you're not using the static renderer, or have defined a [custom HTML renderer](../../guides/static-rendering/#custom-renderers), then `meta` can contain whatever you'd like.


### Example

```js
createPage({
  title: 'Frontend Armory',
  meta: {
    description: "Advanced React for Experienced Developers.",
  },
  getContent: () => import('./landing.mdx'),
})
```


`createRedirect()`
------------------

```typescript
createRedirect(
  to:
    | string
    | Partial<URLDescriptor>
    | (env =>
        | string
        | Partial<URLDescriptor>
        | Promise<string | Partial<URLDescriptor>
      )
)
```

Redirects can be mapped to one of switch's paths to declare that any visits to that path will automatically navigate to the specified path.

The value of `to` can be an absolute path, a [partial URL descriptor](../data-types/#urldescriptor), or a getter function that returns either of these.

### Examples

Redirect to `/browse`, relative to the application root:

```js
createRedirect('/browse')
```

Redirect to `./browse`, relative to the path at which the redirect is mounted:

```js
createRedirect('./browse')
```

Redirect to `/login?redirectTo=...`, appending the current URL as parameter, so that the login screen can redirect back to it when complete:

```js
createRedirect(env =>
  '/login?redirectTo='+
  encodeURIComponent(env.mountname+env.url.search)
)
```


`createContext()`
-----------------

```typescript
createContext(
  getChildContext: (env) => any | Promise<any>,
  childDeclaration: Declaration | ((env) => Declaration)
)
```

The `createContext()` declaration will set the value of `env.context` within the `Declaration` passed as its second argument. It won't make any effort to merge in the parent context, but since the parent context is available in `env.context`, you can merge it in yourself.

This declaration can be used to fetch data that is common to a number of ancestors once, instead of fetching it within each ancestor's getters.

### Examples

Frontend Armory's courses are composed of a course Switch with a number of nested Switch and Page declarations. Context is used to provide the course details to each of the nested pages.

```js
import course from './courseDetails'

let context = createContext(
  (env) => ({
    course,
    courseRoot: env.mountname,

    // Merge in the parent context
    ...env.context
  }),
  createSwitch({
    paths: course.paths,
    meta: course,
  })
)
```


Constants vs. Getters
---------------------

The `createPage()` and `createSwitch()` declaration functions take an options object, where `title`, `content`, `meta` and each entry in `paths` can be specified in one of two ways: you can specify a **constant value**, or you can specify a **getter function**.

For example, here's how you'd specify a constant value for a page's `content` option:

```js
{
  content: <div>how much wood could a woodchuck chuck</div>
}
```

And here's how you'd specify a dynamic value using a getter function:

```js
{
  getContent: async (env, metaPromise) =>
    fetch('/yo-google-how-much-wood')
}
```

While getter functions are more verbose than constant values, they provide a number of extra capabilities:

- Getters receive an [Env object](#env-objects), which can be used to create values that depend on a page's url, context, or on other routes.
- Getters will be recomputed whenever the user navigates and whenever your `Navigation` object's context changes.
- If a getter function returns a Promise, then Navi will use that value that the promise resolves to. This means that you can use both standard functions and async functions as getters.
- If a getter function returns a promise to an object of the shape `{ default: value }`, then Navi will use the value under the `default` key. This facilitates use of JavaScript's dynamic `import()` expression.
- The `getContent` and `getTitle` getters will receive a promise to the result of the `getMeta` getter as their second argument, helping to reduce duplicate code.


`Env` objects
-------------

The `env` object passed to your getter functions contains information about the context in which the declaration is mounted.

```typescript
{
  // Contains your Navigation object's context, or the context provided
  // a `createContext` declaration if one exists as an ancestor.
  context: any,

  // Contains all URL parameters, along with all query parameters
  params: { [name: string]: string },

  // The pathname at which this declaration is mounted
  mountname: string,

  // A router object, which can be used to resolve routes and sitemaps
  // for other URLs.
  router: Router,

  // The full requested URL, excluding any hash.
  url: URLDescriptor,
}
```
