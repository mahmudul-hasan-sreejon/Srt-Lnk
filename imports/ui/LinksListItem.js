import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import ClipboardJS from 'clipboard';
import moment from 'moment';


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

    this.clipboard.on('success', () => {
      // update isCopied state
      this.setState({ isCopied: true });

      // update isCopied state after 1.2 sec
      setTimeout(() => this.setState({ isCopied: false }), 1200);
    }).on('error', () => {
      alert('Unable to copy');
    });
  }

  componentWillUnmount() {
    // destroy clipboard object
    this.clipboard.destroy();
  }

  updateVisibility() {
    // call links.setVisibility to update link visibility
    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
  }

  renderStats() {
    const visitedCount = this.props.visitedCount;
    const visitMessage = visitedCount > 1 ? 'visits' : 'visit';

    const lastVisitedAt = this.props.lastVisitedAt;
    const lastVisitedMessage = typeof lastVisitedAt === 'number' ? `(visited ${moment(lastVisitedAt).fromNow()})` : null;

    return (
      <p>{visitedCount} {visitMessage} {lastVisitedMessage}</p>
    );
  }

  render() {
    const url = this.props.url;
    const shortUrl = this.props.shortUrl;

    return (
      <div>
        <p>Url: {url}</p>
        <p>Short Url: {shortUrl}</p>
        <p>Is Visible? : {this.props.visible.toString()}</p>
        {this.renderStats()}

        <a href={shortUrl} target='_blank'>Visit</a>

        <button ref="copy" data-clipboard-text={shortUrl}>
          {this.state.isCopied ? 'Copied' : 'Copy'}
        </button>

        <button onClick={this.updateVisibility.bind(this)}>
          {this.props.visible ? 'Hide' : 'Unhide'}
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
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
