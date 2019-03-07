import React from 'react';
import { Link } from 'react-router-dom';


export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login to Srt Lnk</h1>

        <form></form>

        <Link to='/signup'>Have an account?</Link>
      </div>
    );
  }
}
