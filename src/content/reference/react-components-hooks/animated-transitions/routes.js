import React from 'react'
import { mount, route, redirect } from 'navi'
import { Card, P, RelatedLink, RelatedLinkGroup } from './card'

const routes = mount({
  '/': redirect('/login'),
  '/login': route({
    view: (
      <Card title="Login">
        <P>
          Login to our great site.
        </P>
        <RelatedLinkGroup>
          <RelatedLink href="/join">Join</RelatedLink>
          <RelatedLink href="/recover-password">Forgotten Passwords</RelatedLink>
        </RelatedLinkGroup>
      </Card>
    )
  }),
  '/join': route({
    view: (
      <Card title="Join">
        <P>
          Join our great site.
        </P>
        <RelatedLinkGroup>
          <RelatedLink href="/login">Login</RelatedLink>
          <RelatedLink href="/recover-password">Forgotten Passwords</RelatedLink>
        </RelatedLinkGroup>
      </Card>
    )
  }),
  '/recover-password': route({
    view: (
      <Card title="Forgotten Passwords">
        <P>
          We don't do forgotten passwords. Don't forget it next time huh. Oh wait, there won't <em>be</em> a next time. Muahahahaha.
        </P>
      </Card>
    )
  }),
})

export default routes