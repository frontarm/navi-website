import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-navi'
import { createGlobalStyle } from 'styled-components/macro'
import App from './app'
import routes from './routes'

const GlobalStyle = createGlobalStyle`
  * {
    border: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: auto;
    font-weight: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizeLegibility;
  }

  html {
    background-color: #F5F7FA;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    
    font-size: 16px;
    height: 100%;
    line-height: 1.5rem;
    min-height: 100%;
  }

  body, #root {
    height: 100%;
    min-height: 100%;
  }

  h1 {
    margin: 1rem;
    font-size: 1.2rem;
  }
`

ReactDOM.render(
  <Router routes={routes}>
    <GlobalStyle />
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </Router>,
  document.getElementById('root')
)