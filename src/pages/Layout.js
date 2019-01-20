import React from 'react'
import { NavContent, NavLink } from 'react-navi'
import { StickyContainer, Sticky } from 'react-sticky'
import { Document } from '@frontarm/document'
import classNames from 'classnames/bind'
import { Nav } from './Nav'
import styles from './Layout.module.scss'

const cx = classNames.bind(styles)

export function Layout({ siteMap, repositoryRoot, rootPathname, isAuthenticated, isPro }) {
  return (
    <NavContent>
      {(content, segment, route) => {
        let tableOfContents =
          content &&
          content.tableOfContents &&
          content.tableOfContents()

        // TODO:
        // - if this is a pro page, and the user isn't authenticated or isn't a pro member,
        //   then display an appropriate message

        let mainContent =
          route &&
          // The `<Document>` component's renderers can be set via a
          // `<DocumentProvider>` context, allowing this app's theme to
          // be set by a parent application.
          <>
            <Document
              MDXComponent={content.Component}
              components={{
                ...content.documentComponents,
                headingLink: (props) =>
                  <NavLink {...props} className={cx('headingLink')}>
                    #
                  </NavLink>,
                Beware: ({ className, title, children, ...props }) =>
                  <Document.Block className={cx('Beware')+' '+className}>
                    <aside {...props}>
                      <header>
                        {title}
                      </header>
                      {children}
                    </aside>
                  </Document.Block>
              }}
              canAccessRestrictedContent={isPro}
              className={cx('document')}
              demoboardHelpers={content.demoboardHelpers}
            />
            <footer>
              <a
                className={cx("edit-link")}
                href={'https://github.com/frontarm/navi-website/edit/master/'+content.filename.replace(repositoryRoot, '')}
              >
                Edit this page on GitHub
              </a>
            </footer>
          </>

        if (!isPro && route.meta.exclusiveTo) {
          mainContent =
            <div className={cx('document')}>
              <h1>This guide is exclusive to Pro members.</h1>
              <p>
                <NavLink href='/pricing'>Unlock all content &raquo;</NavLink>
              </p>
              {
                !isAuthenticated &&
                <p>
                  <em>Already a member?</em>{' '}
                  <NavLink href={'/members/login/?redirectTo=' + encodeURIComponent(route.url.pathname)}>Log in</NavLink>
                </p>
              }
            </div>
        }

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
              {mainContent}
            </main>
          </StickyContainer>
        )
      }}
    </NavContent>
  )
}
