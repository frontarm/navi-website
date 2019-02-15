import React, { useContext } from 'react'
import { Link } from 'react-navi'
import styles from './Translations.module.scss'

const languageNames = {
  'en': 'English',
  'ja': '日本語'
}

const TranslationsLink = ({ children }) => 
  <a
    children={children}
    rel="noopener noreferrer"
    target="_blank"
    href="https://github.com/frontarm/navi-website/issues?utf8=%E2%9C%93&q=is%3Aissue+Translation"
  />


// Use a context to pass data in, so that this can be placed manually within
// pages.
export const TranslationsContext = React.createContext()

export default function Translations({ className='' }) {
  let [route, content] = useContext(TranslationsContext)
  let translations = route.data.translations
  let translationsList = null

  if (translations.length > 1) {
    translationsList = (
      <ul>
        {translations.map(language =>
          <li key={language}>
            <Link
              activeClassName={styles['active']}
              href={route.url.href.replace(route.data.language, language)}
            >
              {languageNames[language]}
            </Link>
          </li>  
        )}
        <li className={styles['new']}>
          <TranslationsLink>
            Translate this page
          </TranslationsLink>
        </li>
      </ul>
    )
  }

  return (
    <nav className={styles['Translations']+' '+className}>
      {translationsList}
      {
        content.isTranslationMissing &&
        <p className={styles['missing']}>
          This page hasn't been translated into <strong>{languageNames[route.data.language]}</strong> yet.{' '}
          Can you help by <TranslationsLink>translating it</TranslationsLink>?
        </p>
      }
    </nav>
  )
}