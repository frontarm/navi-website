navi-docs
=========

This repository contains the documentation website for [Navi](https://github.com/frontarm/navi).

You can view the documentation online at [Frontend Armory](https://frontarm.com/navi/) -- this repository is primarily intended for use by contributors.


Getting Started
---------------

Fork and clone the repository, then install the dependencies and peer depedencies with [yarn](https://yarnpkg.com/). Currently, you'll manually need to switch `peerDependencies` to `devDependencies` in `package.json` to do this, as yarn does not include a tool to install peer dependencies.

Once both the peer dependencies and dependencies have been installed, you're ready to start the dev server.

```js
yarn install
yarn start
```

The site's pages are specified in <src/pages/index.html>. You can add, remove or edit content from here.

*Note: the reason that dependencies aren't placed in `devDependencies` is that this package is used as part of a monorepo, and adding the peer deps to `devDependencies` causes conflicts with other packages.*


Changes from vanilla create-react-app
-------------------------------------

This repository is based on create-react-app, but `eject` was run in order to enable two features:

- `__filename` support, which is used to add the *Edit this page on GitHub* links on each page.
- `.mdx` support, which makes it possible to mount the entire site within Frontend Armory.

If it becomes possible to use these features without ejecting, the documentation will be moved back to an unejected create-react-app.

