import React from 'react'
import { Link } from 'react-navi'
import styled, { css } from 'styled-components/macro'

export const P = styled.p`
  color: #334455;
  line-height: 1.4rem;
  margin: 0.75rem;
  text-align: center;
`

export const RelatedLinkGroup = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`

export const RelatedLink = styled(Link)`
  color: #112233;
  font-size: 11px;
  font-weight: 600;
  margin: 0.5rem 0 0;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  :hover {
    text-decoration: underline;
  }
  :nth-child(3) {
    flex-basis: 100%;
  }
`

export const Title = styled.h1`
  color: #112233;
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-align: center;
`

export const Card = ({ children, title, ...props }) => (
  <div
    {...props}
    css={css`
      align-items: stretch;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: stretch;
      margin: 2rem 1rem 1rem;
    `}>
    <div
      css={css`
        flex-grow: 1;
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
        position: relative;
      `}>
      <div
        css={css`
          font-size: 90%;
          padding: 2rem 1.5rem;
          text-align: center;
          padding: 2rem 3rem;
          background-color: #ffffff;
          border: 1px solid #EAECF2;
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.01), 0 0 2px 0px rgba(0, 0, 0, 0.02);
          border-radius: 4x;
          position: relative;
        `}>
        <Title>{title}</Title>
        {children}
      </div>
    </div>
  </div>
)

export default Card
