import React from 'react'

//displays the title and the log in button
const Header = ({onLoginClick, onLogoutClick, loggedIn}) => {
  return (
    <div className="box">
    <header >
      <h1>
        UWRF Prologue
      </h1>
      {loggedIn ? (
        <button onClick={onLogoutClick}>Sign Out</button>
      ) : (
        <button onClick={onLoginClick}>Editor Login</button>
      )}
    </header>
  </div>
  )
}

export default Header