import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {Navigate} from 'react-router-dom';
import './index.css'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checkError, setCheckError] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    const userDetails = {
      username: username,
      password: password,
    };

    const url = "/login";

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        
        Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
        setCheckError(false);
      } else {
        setError(data.error_msg);
        setCheckError(true);
      }

      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setCheckError(true);
      console.error('Network error:', err);
    }
  };
   const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
   
    return <Navigate to="/home" />
  }


return (
  <div className="login-container">
    <div className="left-panel">
      <img src="https://wallpaperaccess.com/full/1209397.jpg" alt="img" style={{height:'100vh',width:'100vh'}}/>
    </div>
    <div className="right-panel">
      <div className="login-box">
        <h2>BookHub</h2>
        <form onSubmit={login}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {checkError && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  </div>
);

}

export default Login;
