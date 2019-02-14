export const filename = __filename
import Blurb from '../components/Blurb'
import { Doc } from '@frontarm/doc'

Create A New App ✨
==================

<Blurb>

Add Navi to your create-react-app project in three steps, or get a head start with one of Navi's starter kits.

</Blurb>

If you've already spun up a create-react-app project, then it only takes three steps to add routing with Navi:

1. `npm install navi react-navi --save`
2. Add some routes, usually within a `routes` directory
3. Add a `<Router routes={routes} />` element

If you want to statically render your project, then there are a couple extra steps involved -- they're explained in the [Static Rendering](../guides/static-rendering/) guide. But for new projects, you can get static rendering out of the box with one of Navi's starter kits:

- [create-react-navi-app](#create-react-navi-app), for a bare-bones app with static routing
- [create-react-blog](#create-react-blog), for a ready-to-go blog


## create-react-navi-app

<Doc.AsideTop>
<Doc.Details aside>

This project wouldn't be possible without Create React App 2. It's a pleasure to work with, and I want to give a huge thanks to its maintainers.

</Doc.Details>

The quickest way to bootstrap a Navi project is with the `create-react-navi-app` tool -- a small wrapper around Create React App 2 that provides three extra features:

- **Pre-configured routing** -- letting you dive in and start building straight away
- **Static rendering for all pages** -- improving load times and SEO<br />
- **MDX support** -- for quickly creating text content<br />

Of course, it also includes all the standard Create React App features that you've come to love, including zero-configuration build and TypeScript support! For full details, see the excellent [Create React App documentation](https://facebook.github.io/create-react-app/).

</Doc.AsideTop>

---

Usage is identical to the `create-react-app` command -- you'll just need to call `create-react-navi-app` instead.

```bash
npm init react-navi-app my-app
cd my-app
npm start
```

Of if you want a TypeScript project, append a `--typescript` flag:

```bash
npm init react-navi-app my-app --typescript
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app, if it isn't automatically opened for you.

Once you’re ready to deploy to production, create a minified bundle with `npm run build`. Then, you can test your minified bundle by calling `npm run serve`.

For more details on the available commands, see the [Scripts guide](https://facebook.github.io/create-react-app/docs/available-scripts) on the Create React App website.


## create-react-blog

If you need to create a content focused, statically rendered website, then create-react-blog will give you a good head start. It comes with everything in `create-react-app` and `create-react-navi-app`, along with:

- Automatic importing of all routes in a `posts` directory
- Sorting and pagination based on date
- Tag pages
- RSS feed generation
- A theme based on the Gatsby blog starter and Dan Abramov's [overreacted.io](http://overreacted.io)

Usage is identical to the `create-react-app` command -- you'll just need to call `create-react-blog` instead.

```bash
npm init react-blog my-blog
cd my-blog
npm start
```

Of if you want a TypeScript project, append a `--typescript` flag:

```bash
npm init react-blog my-blog --typescript
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app, if it isn't automatically opened for you.


### What's next?

Once you've run `create-react-navi-app`, `create-react-blog`, or installed `navi` and `react-navi` in your create-react-app project, there are a few routing concepts that it will be helpful to understand. Once you're ready to dive in, just click through to the next page -- I'll see you there!
