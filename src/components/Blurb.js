import React from 'react'
import { Doc } from '@frontarm/doc'
import styles from './Blurb.module.scss'

export default function Blurb(props) {
  return (
    <Doc.Block className={styles['Blurb']}>
      {props.children}
    </Doc.Block>
  )
}