import React, { useState } from 'react';

//gotta keep the normies out
function LoginComponent({ onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //take username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  //take password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //validate them
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') { //very secure, ik
      console.log('logged in');
      onLogin();
      onClose();
    } else {
      console.log('Invalid username or password. Please try again.');
    }
  };

  //displays the log in form from a button
  return (
    <div className="box">
      <h2>Editor Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginComponent;
