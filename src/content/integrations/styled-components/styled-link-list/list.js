import React from 'react'
import styled from 'styled-components/macro'

const StyledListItem = styled.div`
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
  padding: 0 0.5rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  width: 100%;
  white-space: nowrap;

  & + & {
    border-top: 1px solid #f8f8f8;
  }

  ${props => props.active && `background-color: #f0f4fc`}
`

export const ListItem = ({ title, description, ...rest }) => {
  return (
    <StyledListItem {...rest}>
      <StyledItemText>
        <StyledItemTitle>{title}</StyledItemTitle>
        <StyledItemDescription>{description}</StyledItemDescription>
      </StyledItemText>
    </StyledListItem>
  )
}

const StyledItemText = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  flex-basis: 0;
  flex-direction: column;
  font-size: 0.9rem;
  padding: 0.75rem 0.5rem;
  position: relative;
  text-align: left;
  width: 100%;
  white-space: nowrap;
`

const StyledItemTitle = styled.div`
  color: #333;
  font-weight: 600;
  line-height: 1rem;
  padding-top: 0.2rem;
  overflow: hidden;
  flex-grow: 1;
  text-overflow: ellipsis;
`

const StyledItemDescription = styled.div`
  color: #888;
  font-weight: 400;
  line-height: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const List = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`