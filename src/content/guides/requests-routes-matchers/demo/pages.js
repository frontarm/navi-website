import * as Navi from 'navi'

export default Navi.createSwitch({
  paths: {
    '/': Navi.createPage({
      title: "React/Navi App",
      getContent: () => import('./index.mdx'),
    }),
      
    '/getting-started': Navi.createPage({
      title: "Getting Started",
      getContent: () => import('./getting-started.mdx'),
    }),
  }
})