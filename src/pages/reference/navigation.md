export const filename = __filename

Navigation
==========

Each Navi app has a `Navigation` object that holds its history, routing state, etc.

There are two ways to create a `Navigation` object:

1. [`createBrowserNavigation()`](#createbrowsernavigation) (for use within the browser)
2. [`createMemoryNavigation()`](#creatememorynavigation) (for use on server and within tests)

Both of these methods return a `navigation` object with the same methods and properties, but with different implementations for their respective environments. 


The `navigation` object
-----------------------

An Observable that manages your app's navigation state.


### `navigation.history`

An [`history`](../history/) object, as created by the [history package](https://www.npmjs.com/package/history). You can use this object to directly interact with the browser history, and to implement programmatic navigation.


### `navigation.router`

A <!--[`Router`](../router/)-->`Router` object, which you can use to manually resolve URLs to [`Route`](../route-and-segment/#route) or `SiteMap` objects.


### `navigation.getCurrentValue()`

```typescript
navigation.getCurrentValue(): NavigationSnapshot
```

Returns a [`NavigationSnapshot`](#navigationsnapshot-interface), containing the current history location and current matched route.

Note that the [`Route`](../route-and-segment/#route) in the returned object may be newer than the `Route` output by the React integration's `<NavRoute>` component. This is because `<NavRoute>` will pass out the latest *steady* route -- i.e. one where the `status` property is not `"busy"`.


### `navigation.getSteadyValue()`

```typescript
navigation.getSteadyValue(): Promise<NavigationSnapshot>
```

Returns a promise to a *steady* [`NavigationSnapshot`](#navigationsnapshot-interface) object.

A *steady* [`Route`](../route-and-segment/#route) is one which has a `status` property that is not `"busy"` -- i.e. a `Route` with a URL that matches the current URL, and where all required `content`, `meta`, etc. is available.


### `navigation.setContext()`

```typescript
navigation.setContext(context)
```

Updates the value of [`env.context`](../declarations/#env-objects) within your app's root `Switch`, and then recomputes the navigation state.


### `navigation.steady()`

```typescript
navigation.steady(): Promise<void>
```

Returns a promise that resolves once the current route has a `status` property that is not `"busy"` -- i.e. a [`Route`](../route-and-segment/#route) with a URL that matches the current URL, and where all required `content`, `meta`, etc. is available.


### `navigation.subscribe()`

```typescript
navigation.subscribe(listener: navigationSnapshot => void)
```

Registers a callback that will be called each time that the navigation state changes, i.e. whenever the value that would be returned by `navigation.getCurrentValue()` changes.

The callback will be called with the latest [`NavigationSnapshot`](#navigationsnapshot-interface) object.

While this function gives you low level access to Navi's state, it's rare that you'll need to call it directly (unless you're writing an integration). It's far easier to subscribe through a component like [`<NavProvider>`](../../integrations/react/#navprovider).


## `NavigationSnapshot` objects

These are immutable objects that contain a snapshot of your app's entire routing state at a single point in time.

```typescript
{
  route: Route
  url: URLDescriptor
}
```

## `createBrowserNavigation()`

Use `createBrowserNavigation()` to create a `navigation` object that is linked to the browser's history.

At minimum, you'll need to pass in a `pages` switch. You'll also often want to pass in a `context` object, which will be provided to any getter functions in your `pages` switch through their `env.context` argument.

```typescript
createBrowserNavigation(options: {
  /**
   * The Switch that declares your app's pages.
   */
  pages: Switch,

  /**
   * If provided, this part of any URLs will be ignored. This is useful
   * for mounting a Navi app in a subdirectory on a domain.
   */
  basename?: string,

  /**
   * This will be made available within your `pages` Switch through
   * the `env` object passed to any getter functions.
   */
  context?: any,

  /**
   * If `true`, Navi won't perform any scrolling when navigating between
   * pages.
   */
  disableScrollHandling?: boolean,

  /**
   * The scroll behavior to use when scrolling between hashes on a
   * page. Defaults to smooth.
   */
  hashScrollBehavior?: 'smooth' | 'instant'

  /**
   * You can manually supply a history object. This is useful for
   * integration with react-router.
   * 
   * By default, a browser history object will be created.
   */
  history?: History,

  /**
   * Sets `document.title` to the value of the
   * `pageTitle` property in the current switchs' meta, if it exists.
   * 
   * You can also supply a function that reseives `pageTitle`, and
   * returns a processed string that will be set.
   * 
   * Defaults to `true`.
   */
  setDocumentTitle?: boolean | ((pageTitle?: string) => string),
})
```

### Example

```js
import pages from './pages'

let navigation = Navi.createBrowserNavigation({
  // Your app's root switch
  pages,
})
```


`createMemoryNavigation()`
--------------------------

Use `createMemoryNavigation()` to create a `navigation` object that is independent from any browser history. This is useful for server-side rendering and testing.

At minimum, you'll need to pass in a `pages` switch and initial `url`.

```typescript
createMemoryNavigation(options: {
  /**
   * The Switch that declares your app's pages.
   */
  pages: Switch,

  /**
   * The initial URL to match.
   */
  url: string | Partial<URLDescriptor>

  /**
   * If provided, this part of any URLs will be ignored. This is useful
   * for mounting a Navi app in a subdirectory on a domain.
   */
  basename?: string,

  /**
   * This will be made available within your `pages` Switch through
   * the `env` object passed to any getter functions.
   */
  context?: any,
})
```

### Example

```js
import pages from './pages'

let navigation = Navi.createMemoryNavigation({
  // Your app's root switch
  pages,

  // The URL to resolve
  url: '/test',
})
```