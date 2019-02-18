import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router, View } from 'react-navi'
import routes from './routes'

ReactDOM.render(
  <Router routes={routes}>
    <Suspense fallback={null}>
      <View />
    </Suspense>
  </Router>,
  document.getElementById('root')
);
