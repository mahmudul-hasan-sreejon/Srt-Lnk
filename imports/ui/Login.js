import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';


export default class Login extends React.Component {
  constructor(props) {
    // import props from react component class
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    // prevent browser page refresh
    e.preventDefault();

    // trim reference values
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    // login into user account
    Meteor.loginWithPassword({ email }, password, err => {
      const error = err ? 'Unable to login. Please, check your email and password.' : '';
      this.setState({ error });
    });
  }

  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Srt-Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />

            <button className='button'>Login</button>
          </form>

          <Link to='/signup'>Have an account?</Link>
        </div>
      </div>
    );
  }
}
