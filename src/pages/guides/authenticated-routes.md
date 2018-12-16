export const filename = __filename
export const demoboardHelpers = {
  'helpers.js': require('!raw-loader!./authenticated-routes/helpers.js'),
  'index.js': require('!raw-loader!./authenticated-routes/index.js'),
  'pages.js': require('!raw-loader!./authenticated-routes/pages.js'),
  'resourceSwitchWithLink.js': require('!raw-loader!./authenticated-routes/resourceSwitchWithLink.js'),
  'resourceSwitchWithRedirects.js': require('!raw-loader!./authenticated-routes/resourceSwitchWithRedirects.js'),
  'styles.css': require('!raw-loader!./authenticated-routes/styles.css'),
}

Authenticated Routes
====================

Navi makes it easy to create pages that display different content to authenticated and unauthenticated users, or that redirect unauthenticated users to a login screen -- and all with static rendering!

To implement authentication, you'll need to declare your pages with [getter functions](../../reference/declarations/#constants-vs-getters) -- which let you specify Page content or Switch paths as a *function* of the current environment. For example, you might have a switch where the content for the `/:id` path depends on a URL parameter:

```js
createSwitch({
  paths: {
    '/:id': async env => {
      let resource = await fetchResource(env.params.id)

      return createPage({
        title: resource.title,
        content: resource.content,
      })
    }
  }
})
```

While the above example will work for public content, imagine for a moment that the `fetchResource()` function requires some details about the current user, e.g. for authentication. If that information doesn't exist, then you'll be unable to call `fetchResource()` and so you'll need to display a login screen instead. In addition, you'll need some way of accessing the user's details *within* the getter function. And to do this, you can use `env.context`.

When you pass a function to a Page's content or Switch's path, that function will receive an [Env object](../../reference/declarations/#env-objects) -- which contains a configurable `context` property. By storing the current authentication state on this object, it becomes possibles to declare pages that depend on authentication state. For example, here's one way that you could render a link to the login screen for guest users:

```js
//---
editorFilename: /resourceSwitch.js
restricted: true
//--- index.js <-- index.js
//--- pages.js <-- pages.js
//--- resourceSwitch.js <-- resourceSwitchWithLink.js
//--- helpers.js <-- helpers.js
//--- styles.css <-- styles.css
```


## Setting authentication state

In order to access the `currentUser` object through `env.context.currentUser`, you'll first need to define it. To do so, just pass a `context` object through to [`createBrowserNavigation()`](../../reference/navigation/#createbrowsernavigation) when you first create your app's [`Navigation` object](../../reference/navigation/):

```js
let navigation = Navi.createBrowserNavigation({
  pages,
  context: {
    currentUser: {
      accountId: 'momo-taro-industries',
      displayName: 'Momo Taro',
      jsonWebToken: 'a019lsmr909l12e',
    },
  },
})
```

You can then update `env.context` whenever the authentication state changes by calling `navigation.setContext()`:

```js
navigation.setContext({
  currentUser: null,
})
```

Calling `setContext()` will cause your navigation state to be recomputed, ensuring that any changes will be immediately reflected in the rendered routes.

Here's what this looks like with a hypothetical `authService` authentication API:

```js
//---
editorFilename: /index.js
restricted: true
//--- index.js <-- index.js
//--- pages.js <-- pages.js
//--- resourceSwitch.js <-- resourceSwitchWithLink.js
//--- helpers.js <-- helpers.js
//--- styles.css <-- styles.css
```


## Conditional redirects

Creating guest-specific content for each and every page can take a lot of time while offering very little benefit. In particular, for member-specific pages like *Account Details* or *Purchase History*, it wouldn't really make any sense to display these pages to guest users *at all*.

To avoid creating specific content for unauthenticated users, you can redirecting them directly to a login screen -- while still displaying the page's original content to authenticated users. Here's an example:

```js
//---
editorFilename: /resourceSwitch.js
restricted: true
//--- index.js <-- index.js
//--- pages.js <-- pages.js
//--- resourceSwitch.js <-- resourceSwitchWithRedirects.js
//--- helpers.js <-- helpers.js
//--- styles.css <-- styles.css
```

If you have many authenticated pages, you can create a helper that simplifies this even further by wrapping pages in a conditional redirect:

```js
export function withAuthenticatedEnv(getPage) {
  return env =>
    env.context.currentUser
      ? getPage(env)
      : Navi.createRedirect(
          '/login?redirectTo='+
          encodeURIComponent(env.pathname+env.search)
        )
}

Navi.createSwitch({
  paths: {
    '/:id': withAuthenticatedEnv(env =>
      Navi.createPage({
        title: 'Account Info',
        content: <AccountInfo currentUser={env.currentUser} />
      })
    )
  }
})
```


## Bypassing the login screen

It often doesn't make sense for an authenticated user to be viewing a login screen. Luckily, conditional redirects make it possible to automatically redirect the user to wherever they were planning on going:

```js
//---
editorFilename: /pages.js
restricted: true
//--- index.js <-- index.js
//--- pages.js <-- pages.js
//--- resourceSwitch.js <-- resourceSwitchWithRedirects.js
//--- helpers.js <-- helpers.js
//--- styles.css <-- styles.css
```


## Authentication and Static Rendering

When serving a statically rendered site, each page's HTML will be generated ahead of time. This has big benefits for performance and SEO, but it presents a problem when your app has authenticated routes: if your HTML is generated ahead of time, what HTML should you generate for authenticated routes? What about for routes whose content changes with the environment?

When building your app's HTML, Navi defaults to using an empty object for `env.context`. This means that using the redirect-to-login pattern discussed above, Navi will render authenticated routes as redirects to the login screen.

The default behavior of `navi-scripts` is to render each of your site's redirects as a HTML file with a `<meta http-equiv="redirect">` tag. This means that out of the box, your redirect-to-login routes will work, even with static rendering! Here's what happens:

-   When an unauthenticated user views an authenticated page, their browser will redirect to the login screen, just as expected.

-   When an authenticated user views a page, the user will initially be redirected to a login screen, but they'll then be automatically redirected back to the requested page via `history.replaceState()` once the app has loaded.

    <br />
    <img src={require('./authenticated-routes/auth-redirect-flow.svg')} alt="Redirect flow diagram" />
    <br /><br />

While the default behavior works, there are a couple ways in which it can be improved. In particular, you can prevent the loading screen from being flashed to logged in users before they're redirected to the content.


### Delaying render until authentication

When an authenticated user is redirected to the login screen, there'll be a short delay between the page loading, and the user being redirected through to the page they requested. During this time, any statically rendered content for the login screen will be visible. As a result, authenticated users will see a brief flash of the login screen when they land on an authenticated URL.

This flash isn't usually a problem. It only occurs if the user lands directly on a protected page, and won't occur for subsequent navigation via `pushState()` within the same tab. Additionally, it won't occur at all if the user lands on a public page before moving to a private page. However, if you really want to make things as polished as possible, there's a simple solution: hide the login form until authentication has occurred.

There are a number of ways to do this, but the simplest is to add an `isAuthenticationStateKnown` boolean to your Navi app's `context`, and set it to `true` once you've verified the user's identity, or decided that the user is a guest. You can then pass the value through to your login component's `props` to hide the login form until appropriate.

One thing to be careful of here is that [ReactDOM.hydrate()](https://reactjs.org/docs/react-dom.html#hydrate) can do funny things if the hydrated element doesn't exactly match the statically rendered element. Because of this, you'll always want to set `isAuthenticationStateKnown` to true *after* the initial render.


### HTTP redirects

By default, navi-scripts renders redirects as a HTML file with `<meta>`-based redirect. While this default will usually get the job done, it does have the issue of not being able to forward the URL `?search` through to the target URL. As a result, to use `?search` parameters with authenticated pages, you'll need to set up HTTP redirects. For details, see the [HTTP redirects](../static-rendering/#http-redirects) section in the Static Rendering guide.
