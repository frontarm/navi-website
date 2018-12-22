export const filename = __filename
import { Document } from '@frontarm/document'

Navi
====

*An async-first router for React.*

<br />
<iframe width="560" height="315" src="https://www.youtube.com/embed/PkIS_Xgf1zc" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
<br />
<br />

*Just getting started?*

- [Why Navi?](./motivation)
- [Jump into the minimal example &raquo;](./guides/minimal-example)
- [Play with the demoboard &raquo;](https://frontarm.com/demoboard/?id=1229d493-ffaf-4133-b384-0f7dfec85af5)
- [Get started with create-react-navi-app &raquo;](./create-react-navi-app)

<Document.Block style={{marginTop: '6rem'}}>
<aside>
<h4>Navi ❤️ Async</h4>

To get the most out of Navi, you'll need a solid understanding of JavaScript Promises and the new `async`/`await` syntax. If you need a hand getting there, just walk through Frontend Armory's [Mastering Async JavaScript](https://frontarm.com/courses/async-javascript/) course.

</aside>
</Document.Block>


Packages
--------

### navi

The `navi` package contains Navi's core functionality, and works with any other library or framework -- including React, Vue, Express, Vanilla JS and even react-router!

```bash
# For defining pages and matching routes
npm install --save navi
```


### react-navi

The `react-navi` package provides a bunch of helpful React components.

```bash
# For components that integrate with React
npm install --save react-navi
```

For more details, check out the [React integration guide &raquo;](./integrations/react/)


### navi-scripts

The `navi-scripts` package facilitates SEO by generating static HTML for each of your app's pages.

```bash
# For static site generation
npm install --save-dev navi-scripts
```

If you're using `create-react-app`, **setting up `navi-scripts` just takes a one line change in your package.json**. To learn how, click through to the [static rendering guide &raquo;](./guides/static-rendering)


Who uses Navi?
--------------

- [Frontend Armory](https://frontarm.com)
- *Do you use Navi? [Edit this page!](https://github.com/frontarm/navi-website/edit/master/src/pages/start-here.md)*


License
-------

Navi is MIT licensed.
