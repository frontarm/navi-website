import React, { useState } from 'react'
import BusyIndicator from 'react-busy-indicator'
import { Link, NotFoundBoundary, useLoadingRoute } from 'react-navi'


// A simple "authentication" service that just saves the 
// user's name in a cookie.
export const authService = {
  async login(data) {
    await delay(100)
  
    window.localStorage.setItem('auth', JSON.stringify(data))
    this.currentUser = data
    if (this.callback) {
      this.callback(data)
    }
  },
  getCurrentUser() {
    return this.currentUser
  },
  logout() {
    delete this.currentUser
    window.localStorage.clear()
    if (this.callback) {
      this.callback(undefined)
    }
  },
  subscribe(callback) {
    this.callback = callback
    return () => { this.callback = undefined }
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


export function Login({ authService }) {
  let [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    authService.login({ name })
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Who goes there?</h1>
      <p>Your name, please:</p>
      <input 
        value={name}
        onChange={handleChange}
      />
      &nbsp;
      <button>Login with NullAuth&trade;</button>
    </form>
  )
}

export function Layout({ children, currentUser, onLogout }) {
  let loadingRoute = useLoadingRoute()
  return (
    <div className="Layout">
      <BusyIndicator isBusy={!!loadingRoute} delayMs={100} />
      <header className="Layout-header">
        <h1 className="Layout-title">
        <Link href='/'>
          ListMaker Pro 📈
        </Link>
        </h1>
        {
          currentUser &&
          <button onClick={onLogout}>
            Logout
          </button>
        }
      </header>
      <main>
        <NotFoundBoundary render={renderNotFound}>
          {children}
        </NotFoundBoundary>
      </main>
    </div>
  )
}

function renderNotFound() {
  return (
    <div className='Layout-error'>
      <h1>404 - Not Found</h1>
    </div>
  )
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}