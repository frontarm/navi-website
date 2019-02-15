import * as React from 'react'
import BusyIndicator from 'react-busy-indicator'
import { Link, NaviProvider, NavLoading, View, NotFoundBoundary } from 'react-navi'


// A simple "authentication" service that just saves the 
// user's name in a cookie.
export const authService = {
  async login(data) {
    await delay(100)
  
    window.localStorage.setItem('auth', JSON.stringify(data))
    this.currentUser = data
    this.callback(data)
  },
  getCurrentUser() {
    return this.currentUser
  },
  logout() {
    delete this.currentUser
    window.localStorage.clear()
    this.callback(undefined)
  },
  subscribe(callback) {
    this.callback = callback
  }
}
try {
  authService.currentUser = JSON.parse(window.localStorage.getItem('auth'))
}
catch (e) {}


// Simulate a remote API endpoint that returns user-specific data
export async function fetchResource(id, currentUser={}) {
  await delay(500)
  
  let name = currentUser.name || 'Guest'
  let resources = {
    'favorite-foods': <>
      <h3>{name}'s favorite foods</h3>
      <Link href="/resource/fluent-languages">
        View other file &raquo;
      </Link>
      <ul>
        <li>Natto</li>
        <li>Kimchi</li>
      </ul>
    </>,
    'fluent-languages': <>
      <h3>{name}'s fluent languages</h3>
      <Link href="/resource/favorite-foods">
        View other file &raquo;
      </Link>
      <ul>
        <li>English</li>
        <li>日本語</li>
        <li>JavaScript</li>
      </ul>
    </>,
  }

  return {
    title: `${name}'s stuff'`,
    content: resources[id] || <h1>Resource not found</h1>
  }
}


export function LoginLink({ redirectTo }) {
  let loginURL =
    "/login/?redirectTo="+
    encodeURIComponent(redirectTo)

  return (
    <Link href={loginURL}>
      Please log in.
    </Link>
  )
}


// The login screen component directly calls the auth service.
// In a real app, you'd probably want to pass the auth state and
// actions in via props.
export class Login extends React.Component {
  state = {
    name: '',
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Who goes there?</h1>
        <p>Your name, please:</p>
        <input 
          value={this.state.name}
          onChange={this.handleChange}
        />
        &nbsp;
        <button>Login with NullAuth&trade;</button>
      </form>
    )
  }
  
  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    authService.login(this.state)
  }
}

export class App extends React.Component {
  render() {
    return (
      <NaviProvider navigation={this.props.navigation}>
        <NavLoading>
          {isBusy =>
            <div className="App">
              <BusyIndicator isBusy={isBusy} delayMs={100} />
              <header className="App-header">
                <h1 className="App-title">
                <Link href='/'>
                  ListMaker Pro 📈
                </Link>
                </h1>
                {
                  // This will be re-rendered whenever the navigation
                  // changes due to the `<NavLoading>` component.
                  // However, in a real world application you'd want
                  // to pass in the navigation state via props.
                  authService.getCurrentUser() &&
                  <button onClick={() => authService.logout()}>
                    Logout
                  </button>
                }
              </header>
              <main>
                <NotFoundBoundary render={renderNotFound}>
                  <View />
                </NotFoundBoundary>
              </main>
            </div>
          }
        </NavLoading>
      </NaviProvider>
    );
  }
}

function renderNotFound() {
  return (
    <div className='App-error'>
      <h1>404 - Not Found</h1>
    </div>
  )
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}