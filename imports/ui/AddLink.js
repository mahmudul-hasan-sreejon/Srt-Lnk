import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


// bind modal to the app element
Modal.setAppElement(document.getElementById('app'));

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  
  onSubmit(e) {
    // prevent browser page refresh
    e.preventDefault();

    // get user url
    const url = this.state.url;

    // insert url into database
    Meteor.call('links.insert', url, (err) => {
      // if no error then reset form url field, close the modal & reset errors
      if(!err) this.closeModal();
      else this.setState({ error: err.reason });
    });

  }

  onChange(e) {
    // update form url field
    this.setState({ url: e.target.value });
  }

  openModal() {
    // open modal, reset form url field & errors
    this.setState({
      isOpen: true,
      url: '',
      error: ''
    });
  }

  closeModal() {
    // close modal, reset form url field & errors
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }

  afterOpenModal() {
    // focus on input box after open
    this.refs.url.focus();
  }

  showError(error) {
    // call error alert
    Alert.error(error, {
      position: 'bottom',
      effect: 'stackslide',
      preserveContext: true,
      timeout: 7000
    });

    // reset error state
    this.setState({ error: '' });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal.bind(this)} className='button'>+ Add Link</button>

        <Modal contentLabel='Add Link' isOpen={this.state.isOpen} onAfterOpen={this.afterOpenModal.bind(this)} onRequestClose={this.closeModal.bind(this)} className='boxed-view__box' overlayClassName='boxed-view boxed-view--modal'>
          <h1>Add a Link</h1>

          {this.state.error ? this.showError(this.state.error) : undefined}
          <Alert stack={{ limit: 1 }} />

          <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
            <input type='text' placeholder='URL' value={this.state.url} onChange={this.onChange.bind(this)} ref='url' />

            <button className='button'>Add Link</button>

            <button type='button' onClick={this.closeModal.bind(this)} className='button button--secondary'>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
