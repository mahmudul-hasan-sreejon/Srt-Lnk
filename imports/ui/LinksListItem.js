import React from 'react';
import PropTypes from 'prop-types';

import ClipboardJS from 'clipboard';


export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCopied: false
    };
  }
  
  componentDidMount() {
    // copy all text from new clipboard
    this.clipboard = new ClipboardJS(this.refs.copy);

    this.clipboard.
    on('success', () => {
      // update isCopied state
      this.setState({ isCopied: true });

      // update isCopied state after 1.2 sec
      setTimeout(() => this.setState({ isCopied: false }), 1200);
    }).
    on('error', () => {
      alert('Unable to copy');
    });
  }

  componentWillUnmount() {
    // destroy clipboard object
    this.clipboard.destroy();
  }

  render() {
    const url = this.props.url;
    const shortUrl = this.props.shortUrl;

    return (
      <div>
        <p>Url: {url}</p>
        <p>Short Url: {shortUrl}</p>

        <button ref="copy" data-clipboard-text={shortUrl}>
          {this.state.isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
};
