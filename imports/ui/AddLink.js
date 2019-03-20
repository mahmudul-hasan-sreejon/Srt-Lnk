import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';


// bind modal to the app element
Modal.setAppElement(document.getElementById('app'));

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }
  
  onSubmit(e) {
    // prevent browser page refresh
    e.preventDefault();

    // get user url
    const url = this.state.url;

    // insert url into database
    Meteor.call('links.insert', url, (err) => {
      if(!err) { // if no error then reset form url field, close the modal & reset errors
        this.setState({
          url: '',
          isOpen: false,
          error: ''
        });
      }
      else this.setState({ error: err.reason });
    });

  }

  onChange(e) {
    // update form url field
    this.setState({ url: e.target.value });
  }

  toggleModal() {
    // toggle the modal, reset form url field & reset errors
    this.setState({
      isOpen: !this.state.isOpen,
      url: '',
      error: ''
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal.bind(this)}>Add Link</button>

        <Modal isOpen={this.state.isOpen} contentLabel='Add Link'>
          <h1>Add a Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)}>
            <input type='text' placeholder='URL' value={this.state.url} onChange={this.onChange.bind(this)} />

            <button>Add Link</button>
          </form>

          <button onClick={this.toggleModal.bind(this)}>Cancel</button>
        </Modal>
      </div>
    );
  }
}
