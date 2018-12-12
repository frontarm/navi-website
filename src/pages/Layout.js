import React from 'react'
import { NavContentSegment, NavLink } from 'react-navi'
import { StickyContainer, Sticky } from 'react-sticky'
import { Document } from '@frontarm/document'
import classNames from 'classnames/bind'
import { Nav } from './Nav'
import styles from './Layout.module.scss'

const cx = classNames.bind(styles)

export function Layout({ siteMap, repositoryRoot, rootPathname, currentUser, isPro }) {
  return (
    <NavContentSegment>
      {({ route }) => {
        let tableOfContents =
          route &&
          route.content &&
          route.content.tableOfContents &&
          route.content.tableOfContents()

        // TODO:
        // - if this is a pro page, and the user isn't authenticated or isn't a pro member,
        //   then display an appropriate message

        return (
          <StickyContainer className={cx("Layout")}>
            <Sticky
              // Don't need compensation as the sidebar is fixed to the left
              disableCompensation
              // This just adds a `translateX(0)`, which gets in the way of 
              // our own transform.
              disableHardwareAcceleration
            >
              {({ style: { width, ...style } }) =>
                <Nav
                  className={cx('nav')}
                  style={{
                    position: 'absolute',
                    ...style,
                  }}
                  pageMap={siteMap.pages}
                  rootPathname={rootPathname}
                  tableOfContents={tableOfContents}
                  renderToggle={({onToggleOpen, isOpen}) =>
                    <button
                      className={cx('hamburger')}
                      onClick={onToggleOpen}>
                      <div className={cx('icon')} />
                    </button>
                  }
                />
              }
            </Sticky>

            <main className={cx("content")}>
              {
                route &&
                // The `<Document>` component's renderers can be set via a
                // `<DocumentProvider>` context, allowing this app's theme to
                // be set by a parent application.
                <>
                  <Document
                    Component={route.content.Component}
                    components={{
                      ...route.content.documentComponents,
                      headingLink: (props) =>
                        <NavLink {...props} className={cx('headingLink')}>
                          #
                        </NavLink>
                    }}
                    canAccessRestrictedContent={isPro}
                    className={cx('document')}
                    demoboardHelpers={route.content.demoboardHelpers}
                  />
                  <footer>
                    <a
                      className={cx("edit-link")}
                      href={'https://github.com/frontarm/navi-website/edit/master/'+route.content.filename.replace(repositoryRoot, '')}
                    >
                      Edit this page on GitHub
                    </a>
                  </footer>
                </>
              }
            </main>
          </StickyContainer>
        )
      }}
    </NavContentSegment>
  )
}
