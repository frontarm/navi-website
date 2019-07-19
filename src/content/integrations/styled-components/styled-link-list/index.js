import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router, View, useActive, useLinkProps } from 'react-navi'
import Layout from './layout'
import { List, ListItem } from './list'
import routes from './routes'

function ListItemLink({ children, href, ...rest }) {
  let active = useActive(href)
  let linkProps = useLinkProps({ href })
  return (
    <ListItem
      as="a"
      active={active}
      children={children}
      {...rest}
      {...linkProps}
    />
  )
}

ReactDOM.render(
  <Router routes={routes}>
    <Layout
      left={
        <List>
          <ListItemLink
            href="/hats"
            title="Hats"
            description="Don't get burned"
          />
          <ListItemLink
            href="/other"
            title="Other"
            description="Not-a-flamethrowers, etc."
          />
        </List>
      }
      right={
        <Suspense fallback={null}>
          <View />
        </Suspense>
      }
    />
  </Router>,
  document.getElementById('root')
)