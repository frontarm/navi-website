export const filename = __filename
export const demoboardHelpers = {
  'index.js': require('!raw-loader!./layouts-nested-content/index.js'),
  'pages.js': require('!raw-loader!./layouts-nested-content/pages.js'),
  'Layout.js': require('!raw-loader!./layouts-nested-content/Layout.js'),
  'home.md': require('!raw-loader!./layouts-nested-content/home.md'),
  'about.md': require('!raw-loader!./layouts-nested-content/about.md'),
  'styles.css': require('!raw-loader!./layouts-nested-content/styles.css'),
}

# Layouts and Nested Content

Occasionally, you'll find that you have some content that is shared between a *section* of your app, without being shared across the whole thing. You can't render it in the `<App />` component because it's not needed for every page, but you don't want to repeat it across every single page that uses it. For example, the navigation bar on the left of this documentation site is shared by all pages within Navi's documentation, while not being displayed on Frontend Armory's [courses](https://frontarm.com/learn/) and blog.

In situations like this, you'll need a way to render *layout* components -- i.e. components that are shared between pages. And Navi lets you solve this by associating `content` props with *multiple* URL segments.

**Switches can have content too.**

In a Navi app, it's possible to declare `content` for both Pages *and* Switches. In fact, the syntax is identical -- you just pass a `content` or `getContent` option to `createSwitch()`:

```js
//---
restricted: true
editorPathname: /pages.js
//--- index.js <-- index.js
//--- pages.js <-- pages.js
//--- Layout.js <-- Layout.js
//--- home.md <-- home.md
//--- about.md <-- about.md
//--- styles.css <-- styles.css
```

When you add `content` to a `Switch` in a React app, your `<NavContent />` element will render the Switch's content instead of the child Page's content. This is because `<NavContent />` will always render the *first* available `content` in the current URL's Switch or Page segments.

Of course, if you do declare some `content` for a Switch, you'll still need a way to render the Page's content too! And to do that, you'll also use `<NavContent />` -- you just need to use it *inside* of the switch's content, as so:

```js
//---
restricted: true
editorPathname: /Layout.js
//--- index.js <-- index.js
//--- pages.js <-- pages.js
//--- Layout.js <-- Layout.js
//--- home.md <-- home.md
//--- about.md <-- about.md
//--- styles.css <-- styles.css
```

Here's the rule for `<NavContent />`:

**`<NavContent />` will render the next available `content` that hasn't already been rendered by a parent component.**

This allows you to embed entire navi-based websites within *other* navi-based websites. In fact, that's how the Navi documentation website that you're reading is embedded within Frontend Armory -- they both use Navi for routing. You can learn more about this by taking a look at the [Navi Website's source](https://github.com/frontarm/navi-website/blob/master/src/pages/index.js).
