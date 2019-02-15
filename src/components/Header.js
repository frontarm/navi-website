import React from 'react'
import Blurb from './Blurb'
import Translations from './Translations'
import { Doc } from '@frontarm/doc';

export default function Header({ route, content }) {
  return (
    <header>
      <h1>{route.data.title}</h1>
      <Doc.Block>
        <Translations />
      </Doc.Block>
      {route.data.blurb && <Blurb>{route.data.blurb}</Blurb>}
    </header>
  )
}