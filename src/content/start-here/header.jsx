import React from 'react'
import { Link } from 'react-navi'
import { Doc } from '@frontarm/doc'
import Translations from '../../components/Translations'
import styles from './header.module.scss'

export default function StartHereHeader({ children, getStarted, mitLicensed }) {
  return (
    <header className={styles.StartHereHeader}>

      <div className={styles['float-mobile']}>
        <Doc.Image aside className={styles['top-logo']} src={require('../../assets/logo.svg')} />
      </div>

      <h1>Navi</h1>

      <Translations className={styles['translations']} />

      <Doc.Block className={styles['pitch']}>

        {children}

        <div className={styles['buttons']}>
        <Link href='./guides/getting-started' className={styles['primary']}>{getStarted}</Link>
        <a href='https://github.com/frontarm/navi' className={styles['github']}>
          <img src={require('../../assets/github-icon.png')} alt="GitHub icon" /> 
          GitHub
        </a>
        <a href='https://github.com/frontarm/navi/blob/master/LICENSE.md' className={styles['license']}>
          {mitLicensed}
        </a>
        </div>

      </Doc.Block>

    </header>
  )
}