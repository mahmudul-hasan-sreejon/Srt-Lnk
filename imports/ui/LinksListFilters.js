import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';


export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showVisible: false
    };
  }

  componentDidMount() {
    // start a tracker for visibility check
    this.linksListFiltersTracker = Tracker.autorun(() => {
      this.setState({ showVisible: Session.get('showVisible') });
    });
  }

  componentWillUnmount() {
    // stop tracker
    this.linksListFiltersTracker.stop();
  }

  checkVisibility(e) {
    const status = e.target.checked;

    // update session variable
    Session.set('showVisible', !status);
  }

  render() {
    return (
      <div>
        <label className='checkbox'>
          <input type="checkbox" checked={!this.state.showVisible} onChange={this.checkVisibility.bind(this)} className='checkbox__box' />
          show hidden links
        </label>
      </div>
    );
  }
}
