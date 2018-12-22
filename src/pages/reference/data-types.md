export const filename = __filename

# Data Types

These types are all exported for use within TypeScript codebases.

## `Route`

Your app's navigation state at any single time is represented by a `Route` object.

```typescript
enum RouteType {
  Switch = 'switch',
  Page = 'page',
  Redirect = 'redirect',
  Plaecholder = 'placeholder'
}

interface Route {
  url: URLDescriptor

  type: RouteType

  segments: Segment[]
  firstSegment: SwitchSegment
  lastSegment: Segment

  /**
   * Indicates that the router context must be changed to cause any more
   * changes.
   */
  isSteady: boolean

  /**
   * Indicates whether the location has fully loaded (including content if
   * content was requested), is still busy, or encountered an error.
   */
  status: Status

  error?: any

  title: any
  meta: any
  content: any
}
```

## `Segment`

Within your `Route` object, state for the individual `Switch`, `Page` and `Redirect` objects is available through its `route.segments` array. Each `Segment` follows the following shape. 

```typescript
/**
 * A type that covers all Segment objects.
 */
type Segment =
  | PlaceholderSegment
  | SwitchSegment
  | PageSegment
  | RedirectSegment

enum SegmentType {
  Placeholder = 'placeholder',
  Switch = 'switch',
  Page = 'page',
  Redirect = 'redirect',
}

/**
 * All segments extend this interface. It includes all information that can be
 * inferred from just a pattern string and a location.
 */
interface GenericSegment {
  type: SegmentType

  /**
   * Any params that have been matched.
   */
  params: Params

  /**
   * The part of the URL pathname that has been matched.
   */
  url: URLDescriptor
}

/**
 * Placeholder segments appear at the end of a route that is still being
 * resolved.
 */
export interface PlaceholderSegment extends GenericSegment {
  type: SegmentType.Placeholder

  nextSegment?: never
  nextPattern?: never
  status: Status
  error?: any
  content?: never
  meta?: never
  title?: never

  lastRemainingSegment?: never
  remainingSegments: any[]
}

/**
 * Page segments corresponds to a URL segment followed by a final '/'.
 */
export interface PageSegment<Meta extends object = any, Content = any>
  extends GenericSegment {
  type: SegmentType.Page
  content?: Content
  meta?: Meta
  title?: string

  status: Status
  error?: never

  nextSegment?: never
  nextPattern?: never
  lastRemainingSegment?: never
  remainingSegments: any[]
}

/**
 * Redirect segments indicate that anything underneath this segment
 * should be redirected to the location specified at `to`.
 */
export interface RedirectSegment<Meta extends object = any>
  extends GenericSegment {
  to?: string
  meta: Meta
  title?: never
  type: SegmentType.Redirect

  content?: never
  status: Status
  error?: any

  nextSegment?: never
  nextPattern?: never
  lastRemainingSegment?: never
  remainingSegments: any[]
}

/**
 * Switch segments correspond to non-final segment of the URL.
 */
export interface SwitchSegment<Meta extends object = any, Content = any>
  extends GenericSegment {
  type: SegmentType.Switch
  meta: Meta
  title?: string
  switch: Switch<any, Meta, Content>

  status: Status
  error?: any
  content?: Content

  /**
   * The pattern that was matched (with param placeholders if applicable).
   */
  nextPattern?: string

  /**
   * A segment object that contains details on the next part of the URL.
   *
   * It may be undefined if the user has provided an incorrect URL, or
   * if the child's template still needs to be loaded.
   */
  nextSegment?: Segment

  /**
   * An array of all Segment objects corresponding to the remaining parts
   * of the URL.
   *
   * It may be undefined if the user has provided an incorrect URL, or
   * if the child's template still needs to be loaded.
   */
  remainingSegments: Segment[]

  /**
   * Contains the final segment object, whatever it happens to be.
   */
  lastRemainingSegment?: Segment
}
```

## `SiteMap`

Contains two objects mapping URLs to `Route` objects. To generate a `SiteMap`, use the [`router.resolveSiteMap()`](../router/#routerresolvesitemap) method. 

```typescript
export interface SiteMap {
  redirects: {
    [url: string]: Route,
  }
  pages: {
    [url: string]: Route,
  }
}
```

## `Status`

`Route` and `Segment` objects have a status that indicates whether they are **ready** to be used, **busy** being fetched, or whether an **error** prevented them from being completely loaded.

In the case of an `error` status, the `Route` or `Segment` object's `error` prop will contain the error's details.

```typescript
enum Status {
  Ready = 'ready',
  Busy = 'busy',
  Error = 'error',
}
```

## `URLDescriptor`

Whenever you see a property named `url` within Navi, it'll contain a **URL Descriptor** object, which has the following shape:

```typescript
export type URLDescriptor = {
  /**
   * The URL's pathname part, starting from the first `/`, and ending
   * before any search string.
   * 
   * E.g. `/documents/hidden/`
   */
  pathname: string,

  /**
   * The URL's query part, including any `?` character. When there
   * is no query, it defaults to an empty string.
   * 
   * E.g. `?q=pants`.
   */
  search: string,

  /**
   * The URL's hash part, including any `#` character. When there
   * is no hash, it defaults to an empty string.
   * 
   * E.g. `#top`.
   */
  hash: string,

  /**
   * An object containing string values of parameters extracted from
   * the `pathname` or `search` properties. 
   */
  query: Params,

  /**
   * The full string URL. If this URL Descriptor was created from a
   * string that you passed in, then this will match your provided
   * string.
   */
  href: string,

  /**
   * The `state` object, as stored in your browser's `history` object.
   */
  state?: object,
}
```

When you're supplying a URL to Navi, you don't need to supply the entire object. You can just supply a **Partial URL Descriptor** that contains only some of the above properties, and the remaining properties will be given sane defaults.

In fact, you don't even need to supply objects at all -- whenever you need to pass Navi a URL, you can also pass it a URL string, like `/my-great-page?q=icecream#top`, and Navi will convert it into a URL object for internal use. The only exception to this rule is that when you need to provide a value for `state`, you'll need to use an object.
