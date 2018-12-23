import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { NavProvider, NavContent } from 'react-navi'
import { createBrowserNavigation } from 'navi'
import pages from './pages'

let navigation = createBrowserNavigation({ pages })

ReactDOM.render(
  <NavProvider navigation={navigation}>
    <NavContent />
  </NavProvider>,
  document.getElementById('root')
);
