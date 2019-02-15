import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { NaviProvider, View } from 'react-navi'
import { createBrowserNavigation } from 'navi'
import pages from './pages'

let navigation = createBrowserNavigation({ pages })

ReactDOM.render(
  <NaviProvider navigation={navigation}>
    <View />
  </NaviProvider>,
  document.getElementById('root')
);
