export const filename = __filename

URL Descriptors
===============

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

When you're supplying a URL t Navi, you don't need to supply the entire object. You can just supply a **Partial URL Descriptor** that contains only some of the above properties, and the remaining properties will be given sane defaults.

In fact, you don't even need to supply objects at all -- whenever you need to pass Navi a URL, you can also pass it a URL string, like `/my-great-page?q=icecream#top`, and Navi will convert it into a URL object for internal use. The only exception to this rule is that when you need to provide a value for `state`, you'll need to use an object.