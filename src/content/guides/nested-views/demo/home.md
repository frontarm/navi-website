# Layout and Nested Content

In this example, the navbar along the top is rendered by the `Layout` component, which is rendered by `<View />`. Each page's content is then passed to the layout as a nested `<View />`.

This makes the `routes.js` file effectively independent from the rest of the app, allowing it to be mounted inside another app -- just as Navi's documentation is mounted within Frontend Armory.