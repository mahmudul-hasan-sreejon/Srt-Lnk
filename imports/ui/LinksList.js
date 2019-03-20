import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Links } from './../api/links';

import LinksListItem from './LinksListItem';


export default class LinksList extends React.Component {
  constructor(props) {
    // inherit react functionalities
    super(props);

    this.state = {
      links: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      // subscribe to 'links'
      Meteor.subscribe('links');
      // find all visible user links
      const links = Links.find({ visible: Session.get('showVisible') }).fetch();
      // state update
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    // stop the 'linksTracker'
    this.linksTracker.stop();
  }

  // get all user links
  renderLinksListItems() {
    return (
      this.state.links.map((link) => {
        // get current url
        const shortUrl = Meteor.absoluteUrl(link._id);

        // render link list item(s)
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
      })
    );
  }

  render() {
    return (
      <div>
        <p>Links List</p>

        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
}
