export const filename = __filename

History
-------

Navi interacts with the browser history through a `history` object, created by the [history package](https://www.npmjs.com/package/history). Each app should have exactly *one* `history` object, which can be accessed through your [`navigation`](../navigation/) object's `history` property.  

You'll mainly use this object for programmatic navigation. In particular, it's `push()` and `replace()` allow you to change the current URL, and thus cause a change in the current route.

```js
// Push a URL onto the browser history
history.push(path, state?)

// Replace the current URL
history.replace(path, state?)
```


## Navigation within React components

To access the History object within a React application, you can use the [`<NavHistory>`](../../integrations/react/#navhistory) component.



## External histories

The [history](https://npmjs.com/package/history) package that create's Navi's `history` object is exactly the same package used by react-router. This makes it possible to <!--[use both Navi and react-router]()--> use both Navi and react-router in the same project -- just pass react-router's history to the history option of [`createBrowserNavigation()`](../navigation/#createbrowsernavigation)


## Further reading

The react-router [documentation](https://reacttraining.com/react-router/core/api/history) goes into further detail on the `history` object.