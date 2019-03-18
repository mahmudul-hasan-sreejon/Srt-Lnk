import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

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
      // find all user links
      const links = Links.find().fetch();
      // state update
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    // stop the 'linksTracker' on component unmount
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    // get all user links
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
