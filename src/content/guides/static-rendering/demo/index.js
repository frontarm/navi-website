import React from 'react'
import ReactDOM from 'react-dom'
import { Navi } from 'react-navi'
import routes from './routes'

ReactDOM.render(
  <Navi routes={routes} />,
  document.getElementById('root')
);