import React from 'react'
import { createGlobalStyle, css } from 'styled-components/macro'

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

export default function Layout({ left, right }) {
  return (
    <>
      <GlobalStyle />
      <div css={css`
        display: grid;
        grid-template-columns: minmax(0px, 150px) minmax(0px, 150px) 1fr;
        grid-template-areas: 'index content content';
        height: 100%;
      `}>
        <div css={css`
          grid-area: index;
          background-color: #f8f8fb;
          border-right: 1px solid #f0f4f8;
        `}>{left}</div>
        <div css={css`
          grid-area: content;
        `}>{right}</div>
      </div>
    </>
  )
}