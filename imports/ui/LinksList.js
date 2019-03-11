import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import { Links } from './../api/links';


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
      this.state.links.map(link => <p key={link._id}>{link.url}</p>)
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
