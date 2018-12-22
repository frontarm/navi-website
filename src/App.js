import React from 'react'
import { NavProvider, NavLoading, NavNotFoundBoundary, NavContent } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'
import Prism from 'prismjs'
import { DocumentProvider } from '@frontarm/document'

const languages = {
  'jsx': 'jsx',
  'js': 'jsx',
  'html': 'markup',
  'css': 'css',
}
const grammars = {
  'jsx': 'javascript',
  'html': 'html',
  'css': 'css',
}

export class App extends React.Component {
  render() {
    return (
      <DocumentProvider components={{
        Demoboard: ({ editorFilename, id, style, sources }) => {
          let filename = editorFilename || Object.keys(sources)[0]
          let extension = filename.split('.').reverse()[0]
          let language = languages[extension]

          return (
            <pre className={'language-'+language}>
              <code
                id={id}
                style={style}
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(sources[filename], Prism.languages[grammars[language]], language)
                }}
              />
            </pre>
          )
        }
      }}>
        <NavProvider navigation={this.props.navigation}>
          <NavLoading>
            {isLoading =>
              <>
                <BusyIndicator isBusy={isLoading} />
                <NavNotFoundBoundary render={() => <h1>Not Found</h1>}>
                  <NavContent />
                </NavNotFoundBoundary>
              </>
            }
          </NavLoading>
        </NavProvider>
      </DocumentProvider>
    )
  }
}
