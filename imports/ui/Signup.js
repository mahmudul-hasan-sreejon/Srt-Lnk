import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';


export default class Signup extends React.Component {
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

    // password validation
    if(password.length < 9) {
      return this.setState({ error: "Password must be more than 8 characters long" });
    }

    // create account user
    Accounts.createUser({ email, password }, err => {
      const error = err ? err.reason : '';
      this.setState({ error });
    });
  }

  render() {
    return (
      <div>
        <h1>Join Srt Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />

          <button>Create Account</button>
        </form>

        <Link to='/'>Already have an account?</Link>
      </div>
    );
  }
}
